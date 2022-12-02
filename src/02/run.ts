
import InputFile from '../util/InputFile';

const INPUT_FILE = './input/02/input.txt';
const MOVES: Map<string, number> = new Map([
	['A X', 1 + 3],
	['A Y', 2 + 6],
	['A Z', 3 + 0],
	['B X', 1 + 0],
	['B Y', 2 + 3],
	['B Z', 3 + 6],
	['C X', 1 + 6],
	['C Y', 2 + 0],
	['C Z', 3 + 3]
]);

const points = InputFile.readLines(INPUT_FILE)
	.sum(line => MOVES.get(line) || 0);
console.log(points);
