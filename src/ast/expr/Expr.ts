import { ApplicationExpr, parseApplicationExpr } from './ApplicationExpr';
import { Position, PositionRange } from '../../utils/Position';
import { LambdaExpr, parseLambdaExpr } from './LambdaExpr';
import { parseStringExpr, StringExpr } from './StringExpr';
import { parseString } from '../../utils/parseString';
import { parseSpaces } from '../../utils/parseSpaces';
import { NameExpr, parseNameExpr } from './NameExpr';
import { AstNode } from '../AstNode';


export enum ExprType {

    STRING = 'string',
    NAME = 'name',
    APPLICATION = 'application',
    LAMBDA = 'lambda',
}

export interface BaseExpr<Type extends ExprType, Meta> extends AstNode<Meta> {

    readonly type: Type;
}

export type Expr<Meta>
    = StringExpr<Meta>
    | NameExpr<Meta>
    | ApplicationExpr<Meta>
    | LambdaExpr<Meta>
    ;

const parseParens = (input: string, position: Position): [Expr<PositionRange>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const afterOpen = parseString('(', afterSpaces, resultPosition);

    const [expr, afterExpr] = parseExpr(...afterOpen);

    const afterSpaces1 = parseSpaces(...afterExpr);

    const rest = parseString(')', ...afterSpaces1);

    return [expr, rest];
};

export const parseSimpleExpr = (input: string, position: Position): [Expr<PositionRange>, [string, Position]] => {
    try {
        return parseParens(input, position);
    } catch (e) {
        try {
            return parseStringExpr(input, position);
        } catch (e) {
            try {
                return parseLambdaExpr(input, position);
            } catch (e) {
                return parseNameExpr(input, position);
            }
        }
    }
};

export const parseExpr = (input: string, position: Position): [Expr<PositionRange>, [string, Position]] => {
    try {
        return parseApplicationExpr(input, position);
    } catch (e) {
        return parseSimpleExpr(input, position);
    }
};
