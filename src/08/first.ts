
import InputFile from '../util/InputFile';

const trees = InputFile
	.readLinesForDay(8)
	.select((line, yIndex) => ({ line, yIndex }))
	.select(x => ({ ...x, chars: x.line.split('')}))
	.selectMany(x => x.chars.map((c, xIndex) => ({ height: parseInt(c), xIndex, yIndex: x.yIndex })))
	.toArray();

const maxX = trees
	.toEnumerable()
	.max(x => x.xIndex);
const maxY = trees
	.toEnumerable()
	.max(x => x.yIndex);


console.log(trees
	.filter(t =>
		trees.filter(t2 => t2.yIndex == t.yIndex && t2.xIndex < t.xIndex && t2.height < t.height).length == t.xIndex ||
		trees.filter(t2 => t2.yIndex == t.yIndex && t2.xIndex > t.xIndex && t2.height < t.height).length == maxX - t.xIndex ||
		trees.filter(t2 => t2.xIndex == t.xIndex && t2.yIndex < t.yIndex && t2.height < t.height).length == t.yIndex ||
		trees.filter(t2 => t2.xIndex == t.xIndex && t2.yIndex > t.yIndex && t2.height < t.height).length == maxY - t.yIndex)
	.length
	);

