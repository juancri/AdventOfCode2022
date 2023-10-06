
import { readLinesForDay } from '../util/input';
import { getManhattanDistance, point2DFromArray } from '../util/point2D';

const data = readLinesForDay(15)
	.select(line => /x=(\d+), y=(\d+): .* x=(-?\d+), y=(-?\d+)/.exec(line))
	.select(match => match?.slice(1, 5) ?? [])
	.select(match => match.toIntArray())
	.select(array => array.buffer(2))
	.select(groups => groups.map(point2DFromArray))
	.select(pair => ({ sensor: pair.get(0), beacon: pair.get(1) }))
	.select(info => ({ ...info, distance: getManhattanDistance(info.beacon, info.sensor) }))
	.toArray();

const currentPos = { x: 1, y : 1 };
while (true)
{
	const found = data
		.toEnumerable()
		.where(info => getManhattanDistance(currentPos, info.sensor) <= info.distance)
		.select(info => info.sensor.x + info.distance - Math.abs(info.sensor.y - currentPos.y) + 1)
		.orderByDescending(x => x)
		.firstOrDefault();
	if (found === undefined)
		break;

	if (found > 4_000_000)
	{
		currentPos.x = 1;
		currentPos.y += 1;
		continue;
	}

	currentPos.x = found;
}

console.log(currentPos.x * 4_000_000 + currentPos.y);
