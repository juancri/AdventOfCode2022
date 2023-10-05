
import Enumerable from 'linq';
import { readLinesForDay } from '../util/input';
import { getManhattanDistance, point2DFromArray } from '../util/point2D';

const data = readLinesForDay(15)
	.select(line => /x=(\d+), y=(\d+): .* x=(-?\d+), y=(-?\d+)/.exec(line))
	.select(match => match?.slice(1, 5) ?? [])
	.select(match => match.toIntArray())
	.select(array => array.buffer(2))
	.select(groups => groups.map(point2DFromArray))
	.select(groups => groups.toPair())
	.select(({ first, second }) => ({ sensor: first, beacon: second }))
	.select(info => ({ ...info, distance: getManhattanDistance(info.beacon, info.sensor) }))
	.select(info => ({ ...info, distanceY: Math.abs(info.sensor.y - 2_000_000) }))
	.select(info => ({ ...info, extra: info.distance - info.distanceY }))
	.where(({ extra}) => extra >= 0)
	.toArray();

console.log(data
	.toEnumerable()
	.selectMany(({ sensor, extra }) => Enumerable.range(sensor.x - extra, extra * 2 + 1))
	.distinct()
	.where(x => !data.some(info => info.beacon.y === 2_000_000 && info.beacon.x === x))
	.count());
