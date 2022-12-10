
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readCharsForDay(6)
	.windows(14)
	.withIndex()
	.filter(x => x.item.countDistinct() === 14)
	.map(x => x.index + 14)
	.getFirst());
