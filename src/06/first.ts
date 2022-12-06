
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readFileForDay(6)
	.trim()
	.split('')
	.windows(4)
	.withIndex()
	.filter(x => x.item.countDistinct() === 4)
	.map(x => x.index + 4)
	.getFirst());
