import { Position, PositionRange, positionTo } from '../../utils/Position';
import { parseSpaces } from '../../utils/parseSpaces';
import { parseName } from '../../utils/parseName';
import { BaseExpr, ExprType } from './Expr';


export interface NameExpr<Meta> extends BaseExpr<ExprType.NAME, Meta> {

    readonly name: string;
}

export const parseNameExpr = (input: string, position: Position): [NameExpr<PositionRange>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);
    const [name, rest] = parseName(afterSpaces, resultPosition);

    return [{ type: ExprType.NAME, name, meta: positionTo(resultPosition, rest[1]) }, rest];
};
