
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

function getRepeated(arrays: string[][]): number
{
	const repeated = ArrayUtils.getRepeatedItems(arrays);
	const first = ArrayUtils.getFirst(repeated);
	return first.match(/[A-Z]/) ?
		first.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		first.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

console.log(InputFile
	.readGroupedLinesForDay(3, 3)
	.select(g => getRepeated(g
		.select(x => x.split(''))
		.toArray()))
	.sum());
