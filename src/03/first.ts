
import '../util/ArrayExtensions';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readLinesForDay(3)
	.select(line => line.split(''))
	.select(letters => letters.buffer(letters.length / 2))
	.select(ArrayUtils.getRepeatedItems)
	.select(letters => letters.getFirst())
	.sum(l => l.charCodeAt(0) -
		(l.match(/[A-Z]/) ? 38 : 96)));
