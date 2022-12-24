
import Enumerable from 'linq';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';

interface Point { x: number, y: number }

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

function findNextPosition(point: Point, correction: number): Point | null
{
	const found = Enumerable
		.from(points)
		.where(p => p.x === point.x + correction)
		.where(p => p.y > point.y)
		.orderBy(p => p.y)
		.firstOrDefault();
	if (!found)
		return null;

	return { x: found.x, y: found.y - 1};
}

const maxY = points.max(p => p.y);
let sandCount = 0;

while (true)
{
	sandCount++;
	let sandPos = { x: 500, y: 0 };

	while (true)
	{
		// Next point down
		const nextDown =
			findNextPosition(sandPos, 0) ||
			findNextPosition(sandPos, -1) ||
			findNextPosition(sandPos, 1);

		if (nextDown === null)
		{
			// Add
			points.push(sandPos);
			break;
		}

		sandPos = nextDown;
	}
}

console.log(maxY, sandCount);
