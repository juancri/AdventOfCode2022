
import Enumerable from 'linq';
import '../util/ArrayExtensions';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

function getRepeated(arrays: string[][]): number
{
	const repeated = ArrayUtils.getRepeatedItems(arrays);
	const first = repeated.getFirst();
	return first.match(/[A-Z]/) ?
		first.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		first.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

console.log(InputFile
	.readLinesForDay(3)
	.buffer(3)
	.select(g => getRepeated(Enumerable.from(g)
		.select(x => x.split(''))
		.toArray()))
	.sum());
