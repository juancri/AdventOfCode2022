
import InputFile from '../util/InputFile';

const data = InputFile
	.readLineGroupsForDay(5)
	.toArray()
	.toPair();

const stacks = data.first
	.select(line => line.split(''))
	.select(chars => chars.filter((_c, index) => (index - 1) % 4 === 0))
	.select(crates => crates.map((crate, index) => ({ crate, index })))
	.selectMany(crates => crates.filter(({ crate }) => crate.match(/\w/)))
	.groupBy(({ index }) => index)
	.orderBy(group => group.first().index)
	.select(group => group.reverse())
	.select(group => group.select(({ crate }) => crate))
	.select(group => group.toArray())
	.toArray();

data.second
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
