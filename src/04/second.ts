
import InputFile from '../util/InputFile';

type Pair = [number, number];
type PairOfPairs = [Pair, Pair];

console.log(InputFile
	.readLinesForDay(4)
	.select(line => line.split(','))
	.select(pairs => pairs.map(pair => pair
		.split('-')
		.map(x => parseInt(x)) as Pair) as PairOfPairs)
	.count(x => x[0][0] <= x[1][1] && x[0][1] >= x[1][0]));
