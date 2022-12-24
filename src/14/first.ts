
import Enumerable from 'linq';
import { readLinesForDay } from '../util/input';
import Pair from '../util/Pair';
import { Point2D, point2DFromArray } from '../util/point2D';

const points = readLinesForDay(14)
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
	.distinct(p => (p.x << 16) + p.y)
	.toArray();

const initCount = points.length;

function canRest(p: Point2D): boolean
{
	return points.some(found => found.x === p.x && found.y === p.y + 1)
		&& points.some(found => found.x === p.x - 1 && found.y === p.y + 1)
		&& points.some(found => found.x === p.x + 1 && found.y === p.y + 1);
}

function findPointDirectlyUnder(p: Point2D)
{
	return Enumerable
		.from(points)
		.where(found => found.x === p.x)
		.where(found => found.y > p.y)
		.orderBy(found => found.y)
		.firstOrDefault() ?? null;
}

function hasDiagonalLeft(p: Point2D)
{
	return points.some(found => found.x === p.x - 1 && found.y === p.y + 1);
}

function hasDiagonalRight(p: Point2D)
{
	return points.some(found => found.x === p.x + 1 && found.y === p.y + 1);
}

function getNextPosition(): Point2D | null
{
	const pos = { x: 500, y: 0 };
	while (true)
	{
		const directlyUnder = findPointDirectlyUnder(pos);
		if (directlyUnder === null)
			return null;

		pos.y = directlyUnder.y - 1;
		if (canRest(pos))
			return pos;

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

		throw new Error(`should not get to this state with ${JSON.stringify(pos)}`);
	}
}

while (true)
{
	const next = getNextPosition();
	if (next === null)
		break;
	points.push(next);
}

console.log(points.length - initCount);
