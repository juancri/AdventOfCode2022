
import { readLinesForDay } from '../util/input';

const state = { cycle: 0, register: 1, row: '' };

readLinesForDay(10)
	.select(line => line.split(' '))
	.selectMany(words => words[1] ? [0, parseInt(words[1])] : [0])
	.forEach(num =>
	{
		state.row += Math.abs(state.register - state.row.length) < 2 ? '#' : ' ';
		state.register += num;
		if (++state.cycle % 40 === 0)
		{
			console.log(state.row);
			state.row = '';
		}
	});
