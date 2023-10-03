
import { readLinesForDay } from '../util/input';
import Segment from '../util/Segment';

console.log(readLinesForDay(4)
	.select(line => line.split(','))
	.select(segments => segments.map(s => s.split('-')))
	.select(segments => segments.map(s => s.toIntArray()))
	.select(segments => segments.map(Segment.fromArray))
	.count(Segment.intersectArray));
