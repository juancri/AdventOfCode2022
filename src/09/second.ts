
import Enumerable from 'linq';
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

interface Coordinates { x: number, y: number }
const MOVE = new RequireKeyMap<string, (c: Coordinates) => Coordinates> ([
	['R', c => ({ x: c.x + 1, y: c.y + 0 })],
	['L', c => ({ x: c.x - 1, y: c.y + 0 })],
	['U', c => ({ x: c.x + 0, y: c.y + 1 })],
	['D', c => ({ x: c.x + 0, y: c.y - 1 })]
]);

const visited = new Set<string>(['0_0']);
const knots = ArrayUtils.createWith(10, () => ({ x: 0, y: 0 }));

InputFile
	.readLinesForDay(9)
	.select(line => line.split(' '))
	.select(words => ({ name: words.get(0), count: parseInt(words.get(1)) }))
	.selectMany(({ name, count }) => Enumerable.repeat(MOVE.get(name), count))
	.forEach(command =>
	{
		knots[0] = command(knots.get(0));
		for (let i = 0; i < knots.length - 1; i++)
		{
			const first = knots.get(i);
			const second = knots.get(i + 1);
			const diffX = first.x - second.x;
			const diffY = first.y - second.y;
			const sameColumn = first.x === second.x;
			const sameRow = first.y === second.y;
			const bigDiffX = Math.abs(diffX) > 1;
			const bigDiffY = Math.abs(diffY) > 1;
			const moveDiagonal = !sameRow && !sameColumn && (bigDiffX || bigDiffY);
			if ((sameRow && bigDiffX) || moveDiagonal)
				second.x += (diffX > 0) ? 1 : -1;
			if ((sameColumn && bigDiffY) || moveDiagonal)
				second.y += (diffY > 0) ? 1 : -1;
		}

		visited.add(`${knots.getLast().x}_${knots.getLast().y}`);
	});

console.log(visited.size);
