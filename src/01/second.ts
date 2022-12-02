
import fs from 'fs';
import Enumerable from 'linq';

const INPUT_FILE = './input/01/input.txt';

const input = fs
	.readFileSync(INPUT_FILE)
	.toString();
const result = Enumerable
	.from(input.split('\n\n'))
	.select((group: string) => Enumerable
		.from(group.split('\n'))
		.select((line: string) => parseInt(line))
		.sum())
	.orderByDescending(x => x)
	.take(3)
	.sum();

console.log(result);
