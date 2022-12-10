
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';

const data = InputFile
	.readLineGroupsForDay(5)
	.toArray();
const letters = data.get(0)
	.reverse()
	.skip(1)
	.select(line => line.split(''));
const stacks = ArrayUtils
	.transpose(letters.toArray(), ' ')
	.filter((_, index) => (index - 1) % 4 === 0)
	.map(chars => chars.filter(c => c != ' '));

data.get(1)
	.select(line => /^move (\d+) from (\d+) to (\d+)$/.exec(line))
	.select(match => (match as string[]).slice(1, 4))
	.select(a => a.toIntArray())
	.select(a => ({ count: a.get(0), from: a.get(1), to: a.get(2) }))
	.select(move => ({ ...move, from: stacks.get(move.from - 1) }))
	.select(move => ({ ...move, what: move.from.spliceFromLast(move.count) }))
	.select(move => ({ ...move, to: stacks.get(move.to - 1) }))
	.forEach(({ to, what }) => to.push(...what.reverse()));

console.log(stacks
	.flatMap(stack => stack.getLast())
	.join(''));
