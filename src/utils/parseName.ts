import { parseRegex } from './parseRegex';
import { Position } from './Position';


export const parseName = (input: string, position: Position): [string, [string, Position]] =>
    parseRegex(/^[^;()\s]+/u, input, position);
