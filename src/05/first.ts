
import InputFile from '../util/InputFile';

const data = InputFile
	.readLineGroupsForDay(5)
	.toArray()
	.toPair();

const stacks = data.first
	.select(line => line.split(''))
	.select(chars => chars.filter((_c, index) => (index - 1) % 4 === 0))
	.select(crates => crates.map((crate, index) => ({ crate, index })))
	.selectMany(crates => crates.filter(x => x.crate.trim().length > 0))
	.groupBy(x => x.index)
	.orderBy(g => g.first().index)
	.select(g => g.reverse()
		.select(x => x.crate)
		.toArray())
	.toArray();

data.second
	.where(line => line.length > 0)
	.select(line => /^move (\d+) from (\d+) to (\d+)$/.exec(line))
	.select(match => (match as string[]).slice(1, 4))
	.select(a => a.toIntArray())
	.forEach(move => stacks
		.atCheck(move.atCheck(2) - 1)
		.push(...stacks
			.atCheck(move.atCheck(1) - 1)
			.spliceFromLast(move.atCheck(0))
			.reverse()));

console.log(stacks
	.flatMap(stack => stack.getLast())
	.join(''));
