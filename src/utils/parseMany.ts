import { Position } from './Position';


export const parseMany = <T>(
    parser: (input: string, position: Position) => [T, [string, Position]],
    input: string,
    position: Position,
): [T[], [string, Position]] => {
    const resultList: T[] = [];

    let resultRest: [string, Position] = [input, position];

    while (true) {
        try {
            const [expr, rest] = parser(...resultRest);

            resultList.push(expr);

            resultRest = rest;
        } catch (e) {
            break;
        }
    }

    return [resultList, resultRest];
};
