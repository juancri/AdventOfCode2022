
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

console.log(InputFile
	.readFileForDay(6)
	.trim()
	.split('')
	.windows(14)
	.withIndex()
	.filter(x => x.item.countDistinct() === 14)
	.map(x => x.index + 14)
	.getFirst());
