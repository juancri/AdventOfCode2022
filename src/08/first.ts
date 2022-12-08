
import InputFile from '../util/InputFile';
import Map2D from '../util/Map2D';

const trees = new Map2D(InputFile.readLinesForDay(8)
	.select(line => line.split(''))
	.select(chars => chars.toIntArray())
	.toArray());

console.log(trees
	.getEntries()
	.where(t =>
		trees.getValuesLeftOf(t).all(v => v < t.value) ||
		trees.getValuesUpOf(t).all(v => v < t.value) ||
		trees.getValuesRightOf(t).all(v => v < t.value) ||
		trees.getValuesDownOf(t).all(v => v < t.value))
	.count());
