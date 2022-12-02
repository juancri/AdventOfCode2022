
import InputFile from '../util/InputFile';

console.log(InputFile
	.readIntGroups('./input/01/input.txt')
	.max(group => group.sum()));
