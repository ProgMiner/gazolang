import { Position, sumPositions, textToPosition } from './Position';
import { parseError } from './errors';


export const parseString = (pattern: string, input: string, position: Position): [string, Position] => {
    if (!input.startsWith(pattern)) {
        throw parseError(position);
    }

    return [input.substring(pattern.length), sumPositions(position, textToPosition(pattern))];
};
