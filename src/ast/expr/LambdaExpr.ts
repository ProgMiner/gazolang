import { Position, PositionRange, positionTo } from '../../utils/Position';
import { BaseExpr, Expr, ExprType, parseExpr } from './Expr';
import { parseSpaces } from '../../utils/parseSpaces';
import { parseString } from '../../utils/parseString';
import { parseName } from '../../utils/parseName';


export interface LambdaExpr<Meta> extends BaseExpr<ExprType.LAMBDA, Meta> {

    readonly parameter: string;
    readonly body: Expr<Meta>;
}

export const parseLambdaExpr = (input: string, position: Position): [LambdaExpr<PositionRange>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const [afterBackslash, afterBackslashPosition] = parseString('\\', afterSpaces, resultPosition);

    const [afterSpaces1, namePosition] = parseSpaces(afterBackslash, afterBackslashPosition);

    const [parameter, [afterParameter, afterParameterPosition]] = parseName(afterSpaces1, namePosition);

    const [afterSpaces2, arrowPosition] = parseSpaces(afterParameter, afterParameterPosition);

    const [afterArrow, afterArrowPosition] = parseString('->', afterSpaces2, arrowPosition);

    const [body, rest] = parseExpr(afterArrow, afterArrowPosition);

    return [{ type: ExprType.LAMBDA, parameter, body, meta: positionTo(resultPosition, rest[1]) }, rest];
};
