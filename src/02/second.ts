
import { readLinesForDay } from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

const moves = new RequireKeyMap([
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
console.log(readLinesForDay(2)
	.sum(line => moves.get(line)));
