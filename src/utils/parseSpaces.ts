import { Position, sumPositions, textToPosition } from './Position';


export const parseSpaces = (input: string, position: Position): [string, Position] => {
    const match = input.match(/^(?:\s|--.*\n)*/);

    if (match === null) {
        return [input, position];
    }

    return [input.substring(match[0].length), sumPositions(position, textToPosition(match[0]))];
};
