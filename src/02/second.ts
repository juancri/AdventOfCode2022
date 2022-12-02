
import InputFile from '../util/InputFile';

const INPUT_FILE = './input/02/input.txt';
const MOVES: Map<string, number> = new Map([
	['A X', 3 + 0],
	['A Y', 1 + 3],
	['A Z', 2 + 6],
	['B X', 1 + 0],
	['B Y', 2 + 3],
	['B Z', 3 + 6],
	['C X', 2 + 0],
	['C Y', 3 + 3],
	['C Z', 1 + 6]
]);

const points = InputFile.readLines(INPUT_FILE)
	.sum(line => MOVES.get(line) || 0);
console.log(points);
