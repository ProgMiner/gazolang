import { emptyPosition, Position } from './utils/Position';
import { parseProgram } from './ast/Program';
import { evalError, parseError } from './utils/errors';
import { evaluate, EvaluationContext } from './evaluate';


const evaluationContext: EvaluationContext<Position> = {
    internalNames: {
        show: (value: unknown) => `${value}`,
        alert,
        prompt,
        'true': true,
        'false': false,
        'if': (c: unknown, t: unknown, f: unknown) => {
            if (c === true) {
                return t;
            }

            if (c === false) {
                return f;
            }

            throw new Error('condition must evaluate to boolean');
        },
        parseNumber: (x: unknown) => {
            if (typeof x !== 'string') {
                throw new Error('argument of parseNumber must be string');
            }

            return +x;
        },
        '+': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of + must be a number');
            }

            return a + b;
        },
        '-': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of - must be a number');
            }

            return a - b;
        },
        '*': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of * must be a number');
            }

            return a * b;
        },
        '/': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of / must be a number');
            }

            return a / b;
        },
        '%': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of % must be a number');
            }

            return a % b;
        },
    },
    names: {},
};

const boot = () => {
    const codeTextarea = document.getElementById('code');
    const runButton = document.getElementById('run');

    if (!(codeTextarea instanceof HTMLTextAreaElement) || !(runButton instanceof HTMLButtonElement)) {
        throw Error('HTML elements not found');
    }

    runButton.onclick = () => {
        try {
            const [program, [rest, restPosition]] = parseProgram(codeTextarea.value, emptyPosition());

            if (rest.trim() !== '') {
                // noinspection ExceptionCaughtLocallyJS
                throw parseError(restPosition);
            }

            alert(evaluate(evaluationContext, program));
        } catch (e) {
            if (e instanceof Error) {
                alert(e.message);
            }

            console.error(e);
        }
    };
};

try {
    boot();
} catch (e) {
    console.error(e);
}
