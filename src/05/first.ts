
import InputFile from '../util/InputFile';

const data = InputFile
	.readFileForDay(5)
	.split('\n\n')
	.toPair();
const stacks = data.first
	.split('\n')
	.skipLast()
	.map(line => line.split(''))
	.map(chars => chars.filter((_c, index) => (index - 1) % 4 === 0))
	.map(crates => crates.map((crate, index) => ({ crate, stack: index + 1 })))
	.map(crates => crates.filter(x => x.crate.trim().length > 0))
	.toEnumerable()
	.selectMany(crates => crates)
	.groupBy(x => x.stack)
	.select(g => ({
		stack: g.first().stack,
		crates: g.reverse()
			.select(x => x.crate)
			.toArray()
	}))
	.orderBy(s => s.stack)
	.toArray();
const moves = data.second
	.split('\n')
	.filter(x => x.length !== 0)
	.map(line => /^move (\d+) from (\d+) to (\d+)$/.exec(line))
	.map(a => (a as string[]).slice(1, 4))
	.map(a => a.toIntArray())
	.map(a => ({ count: a[0] || 0, from: a[1], to: a[2] }))

for (const move of moves)
{
	const from = stacks.find(s => s.stack === move.from);
	const to = stacks.find(s => s.stack === move.to);
	while (move.count-- > 0)
	{
		const crate = from?.crates.pop();
		if (!crate)
			throw new Error(`Crate not found for stack ${move.from}`);
		to?.crates.push(crate);
	}
}

console.log(stacks
	.map(stack => stack.crates
		.toEnumerable()
		.last())
	.toEnumerable()
	.selectMany(x => x)
	.toArray()
	.join(''));
