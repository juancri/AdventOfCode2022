
import Enumerable from 'linq';
import '../util/ArrayExtensions';
import InputFile from '../util/InputFile';

const letters = InputFile
	.readLinesForDay(6)
	.first()
	.split('');

console.log(Enumerable
	.range(0, letters.length - 14)
	.select(index => ({ index, slice: letters.slice(index, index + 14) }))
	.where(x => x.slice.countDistinct() === 14)
	.select(x => x.index + 14)
	.first());
