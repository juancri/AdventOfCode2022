
import InputFile from '../util/InputFile';

console.log(InputFile
	.readIntGroups('input/01.txt')
	.max(group => group.sum()));
