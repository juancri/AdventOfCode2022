
import fs from 'fs';
import Enumerable from 'linq';

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

function lineToPoints(line: string): number
{
	const found = MOVES.get(line);
	if (!found)
		throw new Error('Points not found for line: ' + line);
	return found;
}

const input = fs
	.readFileSync(INPUT_FILE)
	.toString();
const lines = input.split('\n') as string[];

const points = Enumerable
	.from(lines)
	.where(line => line.length > 0)
	.select(lineToPoints)
	.sum();

console.log(points);
