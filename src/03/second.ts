
import '../util/ArrayExtensions';
import { getRepeatedItems } from '../util/array';
import { readLinesForDay } from '../util/input';

console.log(readLinesForDay(3)
	.select(line => line.split(''))
	.buffer(3)
	.select(getRepeatedItems)
	.select(letters => letters.getFirst())
	.sum(l => l.charCodeAt(0) -
		(l.match(/[A-Z]/) ? 38 : 96)));
