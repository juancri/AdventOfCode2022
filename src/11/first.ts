
import InputFile from '../util/InputFile';

const monkeys = InputFile
	.readLineGroupsForDay(11)
	.select(x => x.skip(1).toArray())
	.select(x => {
		const items = x.get(0).split(':').get(1).trim()
			.split(',').map(x => parseInt(x.trim()));
		const operation = x.get(1).split(':').get(1).trim().replace('new', 'newval');
		const test = parseInt((/(\d+)$/.exec(x.get(2)) as string[]).get(1));
		const nextTrue = parseInt((/(\d+)$/.exec(x.get(3)) as string[]).get(1));
		const nextFalse = parseInt((/(\d+)$/.exec(x.get(4)) as string[]).get(1));
		return { items, operation, test, nextTrue, nextFalse, inspected: 0 };
	})
	.toArray();
const multiplier = monkeys
	.map(m => m.test)
	.reduce((a, b) => a * b);

for (let round = 1; round <= 10_000; round++)
{
	monkeys.forEach(monkey =>
	{
		monkey.items.forEach(item =>
		{
			// @ts-ignore
			const old = item;
			let newval = 0;
			eval(monkey.operation);
			const next = (newval % monkey.test) === 0 ? monkey.nextTrue : monkey.nextFalse;
			const nextMonkey = monkeys.get(next);
			const nextValue = newval % multiplier;
			nextMonkey.items.push(nextValue);
			monkey.inspected++;
		});
		monkey.items = [];
	});
};

console.log(monkeys
	.toEnumerable()
	.select(m => m.inspected)
	.orderByDescending(i => i)
	.take(2)
	.aggregate((a, b) => a * b));
