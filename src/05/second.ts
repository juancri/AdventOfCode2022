
import InputFile from '../util/InputFile';

const data = InputFile
	.readFileForDay(5)
	.split('\n\n')
	.map(g => g.split('\n'))
	.toPair();

const stacks = data.first
	.skipLast()
	.toEnumerable()
	.select(line => line.split(''))
	.select(chars => chars.filter((_c, index) => (index - 1) % 4 === 0))
	.select(crates => crates.map((crate, index) => ({ crate, index })))
	.select(crates => crates.filter(x => x.crate !== ' '))
	.selectMany(crates => crates)
	.groupBy(x => x.index)
	.orderBy(g => g.first().index)
	.select(g => g.reverse()
		.select(x => x.crate)
		.toArray())
	.toArray();

data.second
	.filter(line => line.length > 0)
	.map(line => /^move (\d+) from (\d+) to (\d+)$/.exec(line))
	.map(a => (a as string[]).slice(1, 4))
	.map(a => a.toIntArray())
	.forEach(move =>
	{
		const from = stacks.atCheck(move.atCheck(1) - 1);
		stacks
			.atCheck(move.atCheck(2) - 1)
			.push(...from.spliceFromLast(move.atCheck(0)));
	});

console.log(stacks
	.flatMap(stack => stack.getLast())
	.join(''));
