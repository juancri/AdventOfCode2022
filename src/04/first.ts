
import { readLinesForDay } from '../util/input';
import Pair from '../util/Pair';
import Segment from '../util/Segment';

console.log(readLinesForDay(4)
	.select(line => line.split(','))
	.select(segments => segments.map(s => Segment.parse(s, /^(?<min>\d+)-(?<max>\d+)$/)))
	.select(Pair.fromArray)
	.count(({ first, second }) =>
		first.contains(second) ||
		second.contains(first)));
