
import fs from 'fs';
import Enumerable from 'linq';

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

const input = fs
	.readFileSync(INPUT_FILE)
	.toString();
const points = Enumerable
	.from(input.split('\n') as string[])
	.where(line => line.length > 0)
	.select(line => MOVES.get(line))
	.sum();
console.log(points);
