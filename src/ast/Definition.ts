import { Position } from '../utils/Position';
import { AstNode } from './AstNode';
import { Expr, parseExpr } from './expr/Expr';
import { parseSpaces } from '../utils/parseSpaces';
import { parseName } from '../utils/parseName';
import { parseString } from '../utils/parseString';


export interface Definition<Meta> extends AstNode<Meta> {

    readonly name: string;
    readonly value: Expr<Meta>;
}

export const parseDefinition = (input: string, position: Position): [Definition<Position>, [string, Position]] => {
    const [afterSpaces, resultPosition] = parseSpaces(input, position);

    const [name, afterName] = parseName(afterSpaces, resultPosition);

    const afterSpaces1 = parseSpaces(...afterName);

    const afterAssignment = parseString(':=', ...afterSpaces1);

    const afterSpaces2 = parseSpaces(...afterAssignment);

    const [value, afterValue] = parseExpr(...afterSpaces2);

    const afterSpaces3 = parseSpaces(...afterValue);

    const rest = parseString(';', ...afterSpaces3);

    return [{ name, value, meta: resultPosition }, rest];
};
