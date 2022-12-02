
import InputFile from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

const MOVES = new RequireKeyMap([
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

console.log(InputFile
	.readLines('input/02/input.txt')
	.sum(line => MOVES.get(line)));
