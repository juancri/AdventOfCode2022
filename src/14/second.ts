
import Enumerable from 'linq';
import { readLinesForDay } from '../util/input';
import Pair from '../util/Pair';
import { Point2D, parsePoint2D } from '../util/point2D';

const pointsArray = readLinesForDay(14)
	.select(line => line.split(' -> '))
	.select(points => points.map(p => parsePoint2D(p, /^(?<x>\d+),(?<y>\d+)$/)))
	.selectMany(points => points.windows(2))
	.select(Pair.fromArray)
	.selectMany(({ first, second }) => Enumerable
		.rangeTo(first.x, second.x)
		.join(Enumerable.rangeTo(first.y, second.y),
			() => true, () => true,
			(x, y) => ({ x, y })))
	.toArray();
const points = new Set<number>(pointsArray.map(p => (p.x << 16) + p.y));
const initCount = points.size;
const initMaxY = pointsArray.max(p => p.y);

function getNextPosition(): Point2D
{
	const pos = { x: 500, y: 0 };
	while (true)
	{
		if (pos.y !== initMaxY + 1 && !points.has((pos.x << 16) + pos.y + 1))
		{
			pos.y += 1;
			continue;
		}

		if (pos.y !== initMaxY + 1 && !points.has(((pos.x - 1) << 16) + pos.y + 1))
		{
			pos.x -= 1;
			pos.y += 1;
			continue;
		}

		if (pos.y !== initMaxY + 1 && !points.has(((pos.x + 1) << 16) + pos.y + 1))
		{
			pos.x += 1;
			pos.y += 1;
			continue;
		}

		return pos;
	}
}

while (true)
{
	const next = getNextPosition();
	points.add((next.x << 16) + next.y);
	if (next.x === 500 && next.y === 0)
		break;
}

console.log(points.size - initCount);
