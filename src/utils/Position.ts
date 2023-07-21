

export interface Position {

    readonly row: number;
    readonly column: number;
    readonly fromStart: number;
}

export interface PositionRange extends Position {

    readonly length: number;
}

export const emptyPosition = (): Position => ({ row: 0, column: 0, fromStart: 0 });

export const sumPositions = (a: Position, b: Position): Position => ({
    row: a.row + b.row,
    column: b.row === 0 ? a.column + b.column : b.column,
    fromStart: a.fromStart + b.fromStart,
});

export const printPosition = ({ row, column }: Position): string => `${row}:${column}`;

export const textToPosition = (input: string): Position => {
    let row = 0, column = 0;

    for (const c of input) {
        if (c === '\n') {
            ++row;
            column = 0;
            continue;
        }

        ++column;
    }

    return { row, column, fromStart: input.length };
};

export const positionTo = (a: Position, b: Position): PositionRange => ({
    ...a,
    length: b.fromStart - a.fromStart,
});

export const isPositionRange = (value: Position): value is PositionRange => 'length' in value;
