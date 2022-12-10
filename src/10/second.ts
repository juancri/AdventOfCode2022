
import InputFile from '../util/InputFile';

const state = { cycle: 0, register: 1, row: '' };

InputFile
	.readLinesForDay(10)
	.select(line => line.split(' '))
	.select(words => words[1])
	.selectMany(num => num ? [0, parseInt(num)] : [0])
	.forEach(num =>
	{
		state.row += Math.abs(state.register - state.row.length) <= 1 ? '#' : ' ';
		state.register += num;
		if (++state.cycle % 40 !== 0)
			return;

		console.log(state.row);
		state.row = '';
	});
