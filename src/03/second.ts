
import '../util/ArrayExtensions';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readLinesForDay(3)
	.select(line => line.split(''))
	.buffer(3)
	.select(group => ArrayUtils
		.getRepeatedItems(group)
		.getFirst())
	.select(letter => letter.match(/[A-Z]/) ?
		letter.charCodeAt(0) - 'A'.charCodeAt(0) + 27 :
		letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1)
	.sum());
