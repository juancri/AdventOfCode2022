
import Enumerable from 'linq';
import { readLinesForDay } from '../util/input';
import Pair from '../util/Pair';
import { Point2D, point2DFromArray } from '../util/point2D';

function pointToNumber(p: Point2D): number
{
	return (p.x << 16) + p.y;
}

const pointsArray = readLinesForDay(14)
	.select(line => line.split(' -> '))
	.select(points => points.map(p => p.split(',')))
	.select(points => points.map(p => p.toIntArray()))
	.select(points => points.map(point2DFromArray))
	.selectMany(points => points.windows(2))
	.select(Pair.fromArray)
	.selectMany(({ first, second }) => Enumerable
		.rangeTo(first.x, second.x)
		.join(Enumerable.rangeTo(first.y, second.y),
			() => true, () => true,
			(x, y) => ({ x, y })))
	.toArray();
const points = new Set<number>(pointsArray.map(pointToNumber));
const initCount = points.size;
const maxY = pointsArray.max(p => p.y);

function getNextPosition(): Point2D | null
{
	const pos = { x: 500, y: 0 };
	while (true)
	{
		if (pos.y >= maxY)
			return null;

		if (!points.has(pointToNumber({ x: pos.x, y: pos.y + 1 })))
		{
			pos.y += 1;
			continue;
		}

		if (!points.has(pointToNumber({ x: pos.x - 1, y: pos.y + 1 })))
		{
			pos.x -= 1;
			pos.y += 1;
			continue;
		}

		if (!points.has(pointToNumber({ x: pos.x + 1, y: pos.y + 1 })))
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
	if (next === null)
		break;
	points.add(pointToNumber(next));
}

console.log(points.size - initCount);
