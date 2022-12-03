
import InputFile from '../util/InputFile';

console.log(InputFile
	.readIntGroupsForDay(1)
	.max(group => group.sum()));
