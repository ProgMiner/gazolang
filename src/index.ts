import { emptyPosition, isPositionRange, Position } from './utils/Position';
import { parseError, PositionedError } from './utils/errors';
import { evaluate, EvaluationContext } from './evaluate';
import { parseProgram } from './ast/Program';


const evaluationContext: EvaluationContext<Position> = {
    internalNames: {
        show: (value: unknown) => `${value}`,
        alert,
        prompt,
        confirm,
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
        asList: (value: unknown) => {
            if (typeof value !== 'string' && !Array.isArray(value)) {
                throw new Error('argument of asList must be string or list');
            }

            let result: (s: (a: unknown) => (acc: unknown) => unknown) => (z: unknown) => unknown =
                _ => z => () => z;

            for (let i = value.length - 1; i >= 0; --i) {
                const partialResult = result;

                result = s => z => () => s(value[i])(partialResult(s)(z));
            }

            return result;
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

    codeTextarea.value = localStorage.getItem("code") ?? "";

    codeTextarea.onkeyup = () => {
        localStorage.setItem("code", codeTextarea.value);
    };

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

            if (e instanceof PositionedError) {
                codeTextarea.focus({ preventScroll: true });
                codeTextarea.selectionStart = e.position.fromStart;

                if (isPositionRange(e.position)) {
                    codeTextarea.selectionEnd = e.position.fromStart + e.position.length;
                } else {
                    codeTextarea.selectionEnd = e.position.fromStart;
                }
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
