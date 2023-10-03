
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
const initMaxY = Enumerable
	.from(pointsArray)
	.max(p => p.y);
const floorY = initMaxY + 2;

function hasDirectlyUnder(p: Point2D)
{
	return p.y === floorY - 1 ||
		points.has(pointToNumber({ x: p.x, y: p.y + 1}));
}

function hasDiagonalLeft(p: Point2D)
{
	return p.y === floorY - 1 ||
		points.has(pointToNumber({ x: p.x - 1, y: p.y + 1 }));
}

function hasDiagonalRight(p: Point2D)
{
	return p.y === floorY - 1 ||
		points.has(pointToNumber({ x: p.x + 1, y: p.y + 1 }));
}

function getNextPosition(): Point2D
{
	const pos = { x: 500, y: 0 };
	while (true)
	{
		if (!hasDirectlyUnder(pos))
		{
			pos.y += 1;
			continue;
		}

		if (!hasDiagonalLeft(pos))
		{
			pos.x -= 1;
			pos.y += 1;
			continue;
		}

		if (!hasDiagonalRight(pos))
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
	points.add(pointToNumber(next));
	if (next.x === 500 && next.y === 0)
		break;
}

console.log(points.size - initCount);
