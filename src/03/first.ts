
import Enumerable from 'linq';

import '../util/ArrayExtensions';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

function getRepeatedCode(letters: string[]): number
{
	const groups = Enumerable
		.from(letters)
		.buffer(letters.length / 2)
		.toArray();
	const repeated = ArrayUtils.getRepeatedItems(groups);
	const found = repeated.getFirst();
	return found.match(/[A-Z]/) ?
		found.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		found.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

console.log(InputFile
	.readLinesForDay(3)
	.select(line => getRepeatedCode(line.split('')))
	.sum());
