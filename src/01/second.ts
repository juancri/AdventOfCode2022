
import InputFile from '../util/InputFile';

console.log(InputFile
	.readIntGroups('./input/01/input.txt')
	.select(group => group.sum())
	.orderByDescending(x => x)
	.take(3)
	.sum());
