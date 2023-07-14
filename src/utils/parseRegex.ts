import { Position, sumPositions, textToPosition } from './Position';
import { parseError } from './errors';


export const parseRegex = (regex: RegExp, input: string, position: Position): [string, [string, Position]] => {
    const match = input.match(regex);

    if (match === null) {
        throw parseError(position);
    }

    const result = match[0];
    return [result, [input.substring(result.length), sumPositions(position, textToPosition(result))]];
};
