import { Position, printPosition } from './Position';


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
