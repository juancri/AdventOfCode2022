
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
	.select(info => ({ ...info, extra: info.distance - Math.abs(info.sensor.y - 2_000_000) }))
	.where(({ extra}) => extra >= 0)
	.select(info => ({ ...info, rangeFrom: info.sensor.x - info.extra }))
	.select(info => ({ ...info, rangeTo: info.sensor.x + info.extra }))
	.toArray()
	.toEnumerable();
const beaconsInLine = data
	.where(({ beacon }) => beacon.y === 2_000_000)
	.distinct(({ beacon }) => beacon.x)
	.count();

let x = data.min(info => info.rangeFrom);
let counter = 0;
while (x <= data.max(info => info.rangeTo))
{
	const found = data
		.where(info => info.rangeFrom <= x)
		.where(info => info.rangeTo >= x)
		.orderByDescending(info => info.rangeTo)
		.firstOrDefault();
	if (found === undefined)
		x++;
	else
	{
		counter += (found.rangeTo - x) + 1;
		x = found.rangeTo + 1;
	}
}

console.log(counter - beaconsInLine);
