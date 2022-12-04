
import InputFile from '../util/InputFile';
import Segment from '../util/Segment';

console.log(InputFile
	.readLinesForDay(4)
	.select(line => line.split(','))
	.select(segments => segments.map(s => s.split('-')))
	.select(segments => segments.map(s => s.map(x => parseInt(x))))
	.select(segments => segments.map(Segment.fromArray))
	.count(Segment.intersectArray));
