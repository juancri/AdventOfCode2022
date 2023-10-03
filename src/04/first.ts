
import { readLinesForDay } from '../util/InputFile';
import Pair from '../util/Pair';
import Segment from '../util/Segment';

console.log(readLinesForDay(4)
	.select(line => line.split(','))
	.select(segments => segments.map(s => s.split('-')))
	.select(segments => segments.map(s => s.toIntArray()))
	.select(segments => segments.map(Segment.fromArray))
	.select(Pair.fromArray)
	.count(({ first, second }) =>
		first.contains(second) ||
		second.contains(first)));
