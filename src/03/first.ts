
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

function getRepeatedCode(line: string): number
{
	const middle = line.length / 2;
	const first = line.substring(0, middle);
	const second = line.substring(middle);
	const arrays = [first.split(''), second.split('')];
	const repeated = ArrayUtils.getRepeatedItems(arrays);
	const found = ArrayUtils.getFirst(repeated);
	return found.match(/[A-Z]/) ?
		found.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		found.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
}

console.log(InputFile
	.readLinesForDay(3)
	.select(line => getRepeatedCode(line))
	.sum());
