import { Position, printPosition } from './Position';
import { Expr, ExprType } from '../ast/expr/Expr';


export class PositionedError extends Error {

    public readonly position: Position;

    public constructor(message: string, position: Position) {
        super(`${message} on ${printPosition(position)}`);

        this.position = position;

        // fix instanceof https://stackoverflow.com/a/41429145
        Object.setPrototypeOf(this, PositionedError.prototype);
    }
}

export const parseError = (position: Position, message: string = 'parsing error'): Error => {
    return new PositionedError(message, position);
};

export const evalError = (position: Position, message: string = 'evaluation error'): Error => {
    return new PositionedError(message, position);
};

export const evalExprError = (
    position: Position,
    callStack: Expr<Position>[],
    message: string = 'evaluation error',
): Error => {
    let trace = 'Stack trace:\n';

    for (const expr of callStack) {
        switch (expr.type) {
            case ExprType.STRING:
                trace += `StringExpr \"${expr.value}\" at ${printPosition(expr.meta)}\n`;
                break;

            case ExprType.NAME:
                trace += `NameExpr \"${expr.name}\" at ${printPosition(expr.meta)}\n`;
                break;

            case ExprType.APPLICATION:
                trace += `ApplicationExpr at ${printPosition(expr.meta)}\n`;
                break;

            case ExprType.LAMBDA:
                trace += `LambdaExpr \"${expr.parameter}\" at ${printPosition(expr.meta)}\n`;
                break;
        }
    }

    console.error(trace);
    return evalError(position, message);
};
