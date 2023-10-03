
import '../util/RegExpExtensions';
import '../util/StringExtensions';
import { readLineGroupsForDay } from '../util/input';
import RequireKeyMap from '../util/RequireKeyMap';

const ops = new RequireKeyMap([
	['+', (a: number, b: number) => a + b],
	['*', (a: number, b: number) => a * b]
]);
const monkeys = readLineGroupsForDay(11)
	.select(g => g.toArray())
	.select(g => ({
		items: g.get(1).after(':')
			.split(',')
			.toIntArray(),
		op: ops.get(g.get(2).get(23)),
		opArg: g.get(2).substring(25).toInt(),
		test: /(\d+)$/.getInt(g.get(3)),
		nextTrue: /(\d+)$/.getInt(g.get(4)),
		nextFalse: /(\d+)$/.getInt(g.get(5)),
		inspected: 0
	}))
	.toArray();

for (let round = 1; round <= 20; round++)
{
	monkeys.forEach(m =>
	{
		m.items.forEach(val =>
		{
			const b = m.opArg || val;
			const newVal = Math.floor(m.op(val, b) / 3);
			const next = (newVal % m.test) === 0 ?
				m.nextTrue : m.nextFalse;
			monkeys.get(next).items.push(newVal);
		});
		m.inspected += m.items.length;
		m.items = [];
	});
}

console.log(monkeys
	.toEnumerable()
	.select(m => m.inspected)
	.orderByDescending(i => i)
	.take(2)
	.aggregate((a, b) => a * b));
