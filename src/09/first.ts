
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

interface Coordinates { x: number, y: number }
const MOVE = new RequireKeyMap ([
	['R', (c: Coordinates) => ({ x: c.x + 1, y: c.y + 0 })],
	['L', (c: Coordinates) => ({ x: c.x - 1, y: c.y + 0 })],
	['U', (c: Coordinates) => ({ x: c.x + 0, y: c.y + 1 })],
	['D', (c: Coordinates) => ({ x: c.x + 0, y: c.y - 1 })]
]);

const visited = new Set(['0_0']);
const knots = ArrayUtils.createWith(2, () => ({ x: 0, y: 0 }));

InputFile
	.readLinesForDay(9)
	.select(line => line.split(' ').toPair())
	.selectMany(({ first, second }) => ArrayUtils.create(parseInt(second), MOVE.get(first)))
	.forEach(command =>
	{
		knots[0] = command(knots.getFirst());
		knots.pairWindows().forEach(pair =>
		{
			const diffX = pair.first.x - pair.second.x;
			const diffY = pair.first.y - pair.second.y;
			const bigDiffX = Math.abs(diffX) > 1;
			const bigDiffY = Math.abs(diffY) > 1;
			const moveDiagonal = diffX && diffY && (bigDiffX || bigDiffY);
			if ((!diffY && bigDiffX) || moveDiagonal)
				pair.second.x += (diffX > 0) ? 1 : -1;
			if ((!diffX && bigDiffY) || moveDiagonal)
				pair.second.y += (diffY > 0) ? 1 : -1;
		});

		const tail = knots.getLast();
		visited.add(`${tail.x}_${tail.y}`);
	});

console.log(visited.size);
