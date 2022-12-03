
import Enumerable from 'linq';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

function getRepeated(arrays: string[][]): number
{
	const repeated = Enumerable
		.from(ArrayUtils.getRepeatedItems(arrays))
		.first();
	return repeated.match(/[A-Z]/) ?
		repeated.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		repeated.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

console.log(InputFile
	.readGroupedLinesForDay(3, 3)
	.select(g => getRepeated(g
		.select(x => x.split(''))
		.toArray()))
	.sum());
