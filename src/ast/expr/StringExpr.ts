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

    let uBuffer: string[] = [];
    let wasBackslash = false, wasU = false;
    for (const c of input.substring(1, input.length - 1)) {
        ++pos;

        if (wasU) {
            uBuffer.push(c);

            if (uBuffer.length >= 4) {
                chars.push(String.fromCharCode(+`0x${uBuffer.join('')}`));
                uBuffer = [];
                wasU = false;
            }

            continue;
        }

        if (wasBackslash) {
            switch (c) {
                case '"':
                    chars.push('"');
                    break;

                case 'r':
                    chars.push('\r');
                    break;

                case 'n':
                    chars.push('\n');
                    break;

                case 't':
                    chars.push('\t');
                    break;

                case 'f':
                    chars.push('\f');
                    break;

                case 'v':
                    chars.push('\v');
                    break;

                case 'u':
                    wasU = true;
                    break;

                case '\\':
                    chars.push('\\');
                    break;

                default:
                    const errorPosition: PositionRange = {
                        row: position.row,
                        column: position.column + pos,
                        fromStart: position.fromStart + pos,
                        length: 1,
                    };

                    console.error(parseError(
                        errorPosition,
                        `undefined control sequence "\\${c}"`,
                    ));
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

    if (wasBackslash || wasU) {
        const errorPosition: PositionRange = {
            row: position.row,
            column: position.column + pos,
            fromStart: position.fromStart + pos,
            length: 1,
        };

        console.error(parseError(errorPosition, `unexpected closing quote ${input}`));
        throw parseError(errorPosition, 'unexpected closing quote');
    }

    return chars.join('');
}

export const parseStringExpr = (input: string, position: Position): [StringExpr<PositionRange>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const [literal, rest] = parseRegex(/^"(?:\\.|[^"])*"/, afterSpaces, resultPosition);

    const value = parseStringValue(literal, resultPosition);
    return [{ type: ExprType.STRING, value, meta: positionTo(resultPosition, rest[1]) }, rest];
};
