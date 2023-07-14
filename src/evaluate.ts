import { Position } from './utils/Position';
import { Program } from './ast/Program';
import { Expr, ExprType } from './ast/expr/Expr';
import { evalError } from './utils/errors';


export interface EvaluationContext<Meta> {

    readonly internalNames: Record<string, unknown>;
    readonly names: Record<string, unknown>;

    readonly previous?: EvaluationContext<Meta>;
}

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

    throw evalError(position, `name "${name}" isn't present in context`);
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
    switch (expr.type) {
        case ExprType.STRING:
            return expr.value;

        case ExprType.NAME:
            return lookupContext(context, expr.name, expr.meta);

        case ExprType.APPLICATION:
            const func = evaluateExpr(context, expr.function);
            const argument = evaluateExpr(context, expr.argument);

            if (typeof func !== 'function') {
                throw evalError(expr.meta, 'cannot apply value to non-function type');
            }

            return func(argument);

        case ExprType.LAMBDA:
            return (parameter: unknown) => evaluateExpr(
                expandContext(context, { [expr.parameter]: parameter }),
                expr.body,
            );
    }
};
