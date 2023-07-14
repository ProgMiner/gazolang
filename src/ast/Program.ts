import { Definition, parseDefinition } from './Definition';
import { Position } from '../utils/Position';
import { AstNode } from './AstNode';
import { parseMany } from '../utils/parseMany';
import { parseSpaces } from '../utils/parseSpaces';
import { Expr, parseExpr } from './expr/Expr';


export interface Program<Meta> extends AstNode<Meta> {

    readonly names: readonly Definition<Meta>[];
    readonly expr: Expr<Meta>;
}

export const parseProgram = (input: string, position: Position): [Program<Position>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position)

    const [names, afterNames] = parseMany(parseDefinition, afterSpaces, resultPosition);

    const [expr, rest] = parseExpr(...afterNames);

    return [{ names, expr, meta: resultPosition }, rest];
};
