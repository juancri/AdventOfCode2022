
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readCharsForDay(6)
	.windows(4)
	.withIndex()
	.filter(x => x.item.countDistinct() === 4)
	.map(x => x.index + 4)
	.getFirst());
