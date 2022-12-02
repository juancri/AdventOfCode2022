
import InputFile from '../util/InputFile';

const INPUT_FILE = './input/01/input.txt';

const result = InputFile.readLineGroups(INPUT_FILE)
	.select(group => group.sum(line => parseInt(line)))
	.orderByDescending(x => x)
	.take(3)
	.sum();
console.log(result);
