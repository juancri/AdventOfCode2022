
import InputFile from '../util/InputFile';

const state = { cycle: 0, register: 1, strength: 0 };

InputFile
	.readLinesForDay(10)
	.select(line => line.split(' '))
	.selectMany(words => words[1] ? [0, parseInt(words[1])] : [0])
	.forEach(num =>
	{
		if ((++state.cycle - 20) % 40 === 0)
			state.strength += (state.cycle * state.register);
		state.register += num;
	});

console.log(state.strength);
