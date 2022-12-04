
import InputFile from '../util/InputFile';

console.log(InputFile
	.readLinesForDay(4)
	.select(line => line.split(','))
	.select(pairs => pairs.map(pair =>
		pair.split('-').map(x => parseInt(x))))
	.count(x =>
		// @ts-ignore
		(x[0][0] >= x[1][0] && x[0][1] <= x[1][1]) ||
		// @ts-ignore
		(x[1][0] >= x[0][0] && x[1][1] <= x[0][1])));
