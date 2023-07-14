import { BaseExpr, Expr, ExprType, parseSimpleExpr } from './Expr';
import { parseSpaces } from '../../utils/parseSpaces';
import { parseError } from '../../utils/errors';
import { Position } from '../../utils/Position';
import { parseMany } from '../../utils/parseMany';


export interface ApplicationExpr<Meta> extends BaseExpr<ExprType.APPLICATION, Meta> {

    readonly function: Expr<Meta>;
    readonly argument: Expr<Meta>;
}

export const parseApplicationExpr = (
    input: string,
    position: Position,
): [ApplicationExpr<Position>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const [exprList, rest] = parseMany(parseSimpleExpr, afterSpaces, resultPosition);

    if (exprList.length < 2) {
        throw parseError(resultPosition);
    }

    const result = exprList.reduce((acc, expr) => ({
        type: ExprType.APPLICATION,
        function: acc,
        argument: expr,
        meta: resultPosition,
    }));

    if (result.type !== ExprType.APPLICATION) {
        throw new Error('unreachable');
    }

    return [result, rest];
};
