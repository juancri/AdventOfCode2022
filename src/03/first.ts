
import '../util/ArrayExtensions';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readLinesForDay(3)
	.select(line => line.split(''))
	.select(letters => letters.buffer(letters.length / 2))
	.select(ArrayUtils.getRepeatedItems)
	.select(letters => letters.getFirst())
	.sum(letter => letter.match(/[A-Z]/) ?
		letter.charCodeAt(0) - 38 :
		letter.charCodeAt(0) - 96));
