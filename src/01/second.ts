
import InputFile from '../util/InputFile';

console.log(InputFile
	.readIntGroupsForDay(1)
	.select(group => group.sum())
	.orderByDescending(x => x)
	.take(3)
	.sum());
