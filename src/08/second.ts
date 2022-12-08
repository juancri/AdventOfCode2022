import InputFile from '../util/InputFile';
import Map2D from '../util/Map2D';

const trees = new Map2D(InputFile.readLinesForDay(8)
	.select(line => line.split(''))
	.select(chars => chars.toIntArray())
	.toArray());

console.log(trees
	.getEntries()
	.select(t =>
		trees.getValuesLeftOf(t, true)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		trees.getValuesUpOf(t, true)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		trees.getValuesRightOf(t)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		trees.getValuesDownOf(t)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count())
	.max());
