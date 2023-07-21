import { Position, PositionRange, positionTo } from '../../utils/Position';
import { parseSpaces } from '../../utils/parseSpaces';
import { parseRegex } from '../../utils/parseRegex';
import { parseError } from '../../utils/errors';
import { BaseExpr, ExprType } from './Expr';


export interface StringExpr<Meta> extends BaseExpr<ExprType.STRING, Meta> {

    readonly value: string;
}

export const parseStringValue = (input: string, position: Position): string => {
    const chars = [];
    let pos = 0;

    let wasBackslash = false;
    for (const c of input.substring(1, input.length - 1)) {
        ++pos;

        if (wasBackslash) {
            switch (c) {
                case '"':
                    chars.push('"');
                    break;

                case 'n':
                    chars.push('\n');
                    break;

                case '\\':
                    chars.push('\\');
                    break;

                    // TODO more control sequences

                default:
                    const errorPosition: PositionRange = {
                        row: position.row,
                        column: position.column + pos,
                        fromStart: position.fromStart + pos,
                        length: 1,
                    };

                    throw parseError(
                        errorPosition,
                        `undefined control sequence "\\${c}"`,
                    );
            }

            wasBackslash = false;
            continue;
        }

        if (c === '\\') {
            wasBackslash = true;
            continue;
        }

        chars.push(c);
    }

    return chars.join('');
}

export const parseStringExpr = (input: string, position: Position): [StringExpr<PositionRange>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const [literal, rest] = parseRegex(/^"(?:\\.|[^"])*"/, afterSpaces, resultPosition);

    const value = parseStringValue(literal, resultPosition);
    return [{ type: ExprType.STRING, value, meta: positionTo(resultPosition, rest[1]) }, rest];
};
