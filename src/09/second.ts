
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

interface Coords { x: number, y: number }
const MOVE = new RequireKeyMap<string, (c: Coords) => Coords> ([
	['R', ({ x, y }) => ({ x: x + 1, y })],
	['L', ({ x, y }) => ({ x: x - 1, y })],
	['U', ({ x, y }) => ({ x, y: y + 1 })],
	['D', ({ x, y }) => ({ x, y: y - 1 })]
]);

const visited = new Set(['0_0']);
const knots = ArrayUtils.createWith(10, () => ({ x: 0, y: 0 }));

InputFile
	.readLinesForDay(9)
	.select(line => line.split(' ') as [string, string])
	.selectMany(([c, n]) => ArrayUtils.create(parseInt(n), MOVE.get(c)))
	.forEach(command =>
	{
		knots[0] = command(knots.getFirst());
		knots.pairWindows().forEach(({ first, second }) =>
		{
			const diffX = first.x - second.x;
			const diffY = first.y - second.y;
			const bigDiffX = Math.abs(diffX) > 1;
			const bigDiffY = Math.abs(diffY) > 1;
			const moveDiagonal = diffX && diffY && (bigDiffX || bigDiffY);
			if ((!diffY && bigDiffX) || moveDiagonal)
				second.x += (diffX > 0) ? 1 : -1;
			if ((!diffX && bigDiffY) || moveDiagonal)
				second.y += (diffY > 0) ? 1 : -1;
		});

		const tail = knots.getLast();
		visited.add(`${tail.x}_${tail.y}`);
	});

console.log(visited.size);
