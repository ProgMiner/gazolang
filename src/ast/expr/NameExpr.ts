import { parseName } from '../../utils/parseName';
import { Position } from '../../utils/Position';
import { BaseExpr, ExprType } from './Expr';
import { parseSpaces } from '../../utils/parseSpaces';


export interface NameExpr<Meta> extends BaseExpr<ExprType.NAME, Meta> {

    readonly name: string;
}

export const parseNameExpr = (input: string, position: Position): [NameExpr<Position>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);
    const [name, rest] = parseName(afterSpaces, resultPosition);

    return [{ type: ExprType.NAME, name, meta: resultPosition }, rest];
};
