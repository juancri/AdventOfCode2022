
import Enumerable from 'linq';
import { readLinesForDay } from '../util/input';
import Pair from '../util/Pair';

interface Point { x: number, y: number }

const points = readLinesForDay(14)
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

function findNextPosition(point: Point, correction: number): Point | undefined
{
	return Enumerable
		.from(points)
		.where(p => p.x === point.x + correction)
		.where(p => p.y >= point.y)
		.orderBy(p => p.y)
		.firstOrDefault();
}

const maxY = points.max(p => p.y);
let sandCount = 0;

count: while (true)
{
	sandCount++;
	console.log(`sandCount: ${sandCount}`);
	let sandPos = { x: 500, y: 0 };

	while (true)
	{
		console.log(`testing pos ${sandPos.x},${sandPos.y}`);
		// Next point down
		const nextDown =
			findNextPosition(sandPos, 0) ||
			findNextPosition(sandPos, -1) ||
			findNextPosition(sandPos, 1);
		console.log(`found next: ${nextDown?.x},${nextDown?.y}`);

		if (!nextDown)
		{
			console.log(`it's null... breaking count`);
			break count;
		}
		if (nextDown.y - sandPos.y === 1)
		{
			console.log('diff is 1, adding to points');
			points.push(sandPos);
			break;
		}

		console.log('continuing');
		sandPos = { x: nextDown.x, y: nextDown.y - 1 };
	}
}

console.log(maxY, sandCount);
