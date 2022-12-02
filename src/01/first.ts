
import InputFile from '../util/InputFile';

const INPUT_FILE = './input/01/input.txt';

const result = InputFile.readLineGroups(INPUT_FILE)
	.max(group => group.sum(line => parseInt(line)));
console.log(result);
