import { emptyPosition, isPositionRange, Position, textToPosition } from './utils/Position';
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
        'undefined': undefined,
        'if': (c: unknown) => (t: unknown) => (f: unknown) => {
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
        toString: (x: unknown) => `${x}`,
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
        asArray: (value: (s: unknown) => (z: unknown) => () => unknown) => {
            const result: unknown[] = [];

            // hack with mutable array to improve performance and readability
            value((v: unknown) => (acc: () => void) => { acc(); result.unshift(v); })(undefined)();
            return result;
        },
        join: (sep: string) => (arr: unknown[]) => arr.join(sep),
        chr: (x: unknown) => {
            if (typeof x !== 'number') {
                throw new Error('argument of chr must be a number');
            }

            return String.fromCharCode(x);
        },
        '==': (a: unknown) => (b: unknown) => a === b,
        '!=': (a: unknown) => (b: unknown) => a !== b,
        '<': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of < must be a number');
            }

            return a < b;
        },
        '<=': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of <= must be a number');
            }

            return a <= b;
        },
        '>': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of > must be a number');
            }

            return a > b;
        },
        '>=': (a: unknown) => (b: unknown) => {
            if (typeof a !== 'number' || typeof b !== 'number') {
                throw new Error('argument of >= must be a number');
            }

            return a >= b;
        },
    },
    names: {},
};

const boot = () => {
    const codeLinesDiv = document.getElementById('code_lines');
    const codeTextarea = document.getElementById('code');
    const runButton = document.getElementById('run');

    if (!(codeLinesDiv instanceof HTMLDivElement)
        || !(codeTextarea instanceof HTMLTextAreaElement)
        || !(runButton instanceof HTMLButtonElement)) {
        throw Error('HTML elements not found');
    }

    codeTextarea.value = localStorage.getItem("code") ?? "";

    const updateCodeLinesBounds = () => {
        const bodyBounds = document.body.getBoundingClientRect();
        const bounds = codeTextarea.getBoundingClientRect();

        codeLinesDiv.style.right = `${bodyBounds.width - (bounds.x + bounds.width)}px`;
        codeLinesDiv.style.top = `${bounds.y}px`;
        codeLinesDiv.style.bottom = `${bounds.y + bounds.height}px`;
        codeLinesDiv.style.height = `${bounds.height}px`;
    };

    updateCodeLinesBounds();
    document.body.onresize = updateCodeLinesBounds;

    codeTextarea.onscroll = () => {
        codeLinesDiv.scrollTop = codeTextarea.scrollTop;
    };

    const updateCodeLinesText = () => {
        const { row } = textToPosition(codeTextarea.value);

        let lines = '';
        for (let i = 0; i < Math.max(1, row) * 10; ++i) {
            lines += `-- ${i}\n`;
        }

        codeLinesDiv.innerText = lines;
    };

    updateCodeLinesText();

    codeTextarea.onkeydown = (event) => {
        if (event.key === 'Tab') {
            const { value } = codeTextarea;

            const absPos = codeTextarea.selectionStart;
            const { column: pos } = textToPosition(value.substring(0, absPos));

            const left = value.substring(0, absPos);
            const right = value.substring(absPos);

            codeTextarea.value = left + "    ".substring(pos % 4) + right;
            codeTextarea.selectionStart = codeTextarea.selectionEnd = absPos + (4 - pos % 4);

            event.preventDefault();
            return;
        }

        if (event.key === 'Backspace' && event.ctrlKey) {
            const { value } = codeTextarea;

            const absPos = codeTextarea.selectionStart;
            const { column: pos } = textToPosition(value.substring(0, absPos));

            const begin = value.substring(0, absPos);
            const trimmed = begin.trimEnd();

            if (begin.length !== trimmed.length && pos > 0) {
                const spacesLength = Math.min(begin.length - trimmed.length, pos);
                const newPos = absPos - spacesLength;

                codeTextarea.value = value.substring(0, newPos) + value.substring(absPos);
                codeTextarea.selectionStart = codeTextarea.selectionEnd = newPos;

                event.preventDefault();
                return;
            }
        }

        if (event.code === 'KeyZ' && event.ctrlKey) {
            const undoStack: [string, number][] = JSON.parse(localStorage.getItem("undo") ?? "[]");
            const redoStack: [string, number][] = JSON.parse(localStorage.getItem("redo") ?? "[]");

            if (event.shiftKey) {
                if (redoStack.length > 0) {
                    const [value, pos] = redoStack.pop()!;
                    undoStack.push([codeTextarea.value, codeTextarea.selectionStart]);

                    codeTextarea.value = value;
                    codeTextarea.selectionStart = codeTextarea.selectionEnd = pos;

                    localStorage.setItem('code', value);
                }
            } else {
                if (undoStack.length > 0) {
                    const [value, pos] = undoStack.pop()!;
                    redoStack.push([codeTextarea.value, codeTextarea.selectionStart]);

                    codeTextarea.value = value;
                    codeTextarea.selectionStart = codeTextarea.selectionEnd = pos;

                    localStorage.setItem('code', value);
                }
            }

            localStorage.setItem("undo", JSON.stringify(undoStack));
            localStorage.setItem("redo", JSON.stringify(redoStack));

            event.preventDefault();
            return;
        }
    };

    let lastCursorPosition = 0;
    codeTextarea.onkeyup = () => {
        const oldValue = localStorage.getItem("code") ?? "";
        const value = codeTextarea.value;

        if (oldValue !== value) {
            localStorage.setItem("code", value);

            const undoStack: [string, number][] = JSON.parse(localStorage.getItem("undo") ?? "[]");
            undoStack.push([oldValue, lastCursorPosition]);

            if (undoStack.length > 100) {
                undoStack.shift();
            }

            localStorage.setItem("undo", JSON.stringify(undoStack));
            localStorage.removeItem("redo");
        }

        lastCursorPosition = codeTextarea.selectionStart;
    };

    codeTextarea.onclick = () => {
        lastCursorPosition = codeTextarea.selectionStart;
    };

    runButton.onclick = async () => {
        runButton.disabled = true;
        runButton.innerText = 'Парсинг...';

        await new Promise(resolve => setTimeout(resolve, 1));
        const parsingStartTime = performance.now();

        try {
            const [program, [rest, restPosition]] = parseProgram(codeTextarea.value, emptyPosition());

            if (rest.trim() !== '') {
                // noinspection ExceptionCaughtLocallyJS
                throw parseError(restPosition);
            }

            console.log(`Parsing took ${performance.now() - parsingStartTime}`);

            runButton.innerText = 'Выполнение...';
            await new Promise(resolve => setTimeout(resolve, 1));

            const evalStartTime = performance.now();
            const result = evaluate(evaluationContext, program);

            console.log(`Evaluation took ${performance.now() - evalStartTime}`);

            if (result !== undefined) {
                alert(result);
            }
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

        runButton.innerText = 'Запуск';
        runButton.disabled = false;
    };
};

try {
    boot();
} catch (e) {
    console.error(e);
}
