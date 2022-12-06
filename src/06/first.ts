
import Enumerable from 'linq';
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

const letters = InputFile
	.readLinesForDay(6)
	.first()
	.split('');

console.log(Enumerable
	.range(0, letters.length - 4)
	.select(index => ({ index, slice: letters.slice(index, index + 4) }))
	.where(x => x.slice.countDistinct() === 4)
	.select(x => x.index + 4)
	.first());
