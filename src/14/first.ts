
import Enumerable from 'linq';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';

const points = InputFile
	.readLinesForDay(14)
	.select(line => line.split(' -> '))
	.select(points => points.map(p => p.split(',')))
	.select(points => points.map(p => p.toIntArray()))
	.select(points => points.map(p => ({ x: p.get(0), y: p.get(1) })))
	.selectMany(points => points.windows(2))
	.select(Pair.fromArray)
	.selectMany(({ first, second }) => Enumerable
		.rangeTo(first.x, second.x)
		.join(Enumerable.rangeTo(first.y, second.y),
			() => true, () => true,
			(x, y) => ({ x, y })))
	.distinct(p => (p.x << 16) + p.y)
	.toArray();

const maxY = points.max(p => p.y);

let count = 0;
while (++count)
{
	let pos = { x: 500, y: 0 };

}

console.log(points, maxY);
