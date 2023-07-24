import { evalError, evalExprError } from './utils/errors';
import { Expr, ExprType } from './ast/expr/Expr';
import { Position } from './utils/Position';
import { Program } from './ast/Program';


export interface EvaluationContext<Meta> {

    readonly internalNames: Record<string, unknown>;
    readonly names: Record<string, unknown>;

    readonly previous?: EvaluationContext<Meta>;
}

const callStack: Expr<Position>[] = [];

export const expandContext = <Meta>(
    context: EvaluationContext<Meta>,
    names: Record<string, unknown>,
): EvaluationContext<Meta> => ({
    internalNames: {},
    names,
    previous: context,
});

export const lookupContext = <Meta>(
    context: EvaluationContext<Meta>,
    name: string,
    position: Position,
): unknown => {
    if (context.names.hasOwnProperty(name)) {
        return context.names[name];
    }

    if (context.internalNames.hasOwnProperty(name)) {
        return context.internalNames[name];
    }

    if (context.previous !== undefined) {
        return lookupContext(context.previous, name, position);
    }

    throw evalExprError(position, callStack, `name "${name}" isn't present in context`);
};

export const evaluate = (context: EvaluationContext<Position>, program: Program<Position>): unknown => {
    const names: Record<string, unknown> = {};

    for (const { name, value, meta } of program.names) {
        if (name in names) {
            throw evalError(meta, 'duplicated names are not supported');
        }

        names[name] = evaluateExpr(expandContext(context, names), value);
    }

    return evaluateExpr(expandContext(context, names), program.expr);
};

export const evaluateExpr = (context: EvaluationContext<Position>, expr: Expr<Position>): unknown => {
    callStack.push(expr);

    let result: unknown;
    switch (expr.type) {
        case ExprType.STRING:
            result = expr.value;
            break;

        case ExprType.NAME:
            result = lookupContext(context, expr.name, expr.meta);
            break;

        case ExprType.APPLICATION:
            const func = evaluateExpr(context, expr.function);
            const argument = evaluateExpr(context, expr.argument);

            if (typeof func !== 'function') {
                throw evalExprError(expr.meta, callStack, 'cannot apply value to non-function type');
            }

            result = func(argument);
            break;

        case ExprType.LAMBDA:
            result = (argument: unknown) => {
                callStack.push(expr);

                const result = evaluateExpr(
                    expandContext(context, { [expr.parameter]: argument }),
                    expr.body,
                );

                callStack.pop();
                return result;
            };

            break;
    }

    callStack.pop();
    return result;
};
