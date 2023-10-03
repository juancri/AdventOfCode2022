
import { readLinesForDay } from '../util/input';
import Segment from '../util/Segment';

console.log(readLinesForDay(4)
	.select(line => line.split(','))
	.select(segments => segments.map(s => Segment.parse(s, /^(?<min>\d+)-(?<max>\d+)$/)))
	.count(Segment.intersectArray));
