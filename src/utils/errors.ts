import { Position, printPosition } from './Position';


export const parseError = (position: Position, message: string = 'parsing error'): Error => {
    return new Error(`${message} on ${printPosition(position)}`);
};

export const evalError = (position: Position, message: string = 'evaluation error'): Error => {
    return new Error(`${message} on ${printPosition(position)}`);
};
