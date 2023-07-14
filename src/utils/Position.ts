

export interface Position {

    readonly row: number;
    readonly column: number;
}

export const emptyPosition = (): Position => ({ row: 0, column: 0 });

export const sumPositions = (a: Position, b: Position): Position => ({
    row: a.row + b.row,
    column: a.column + b.column,
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

    return { row, column };
};
