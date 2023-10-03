
import '../util/ArrayExtensions';
import { readCharsForDay } from '../util/input';

console.log(readCharsForDay(6)
	.windows(4)
	.withIndex()
	.filter(x => x.item.countDistinct() === 4)
	.map(x => x.index + 4)
	.getFirst());
