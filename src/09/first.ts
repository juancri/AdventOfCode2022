
import ArrayUtils from '../util/ArrayUtils';
import InputFile from '../util/InputFile';
import RequireKeyMap from '../util/RequireKeyMap';

type NumberPair = [number, number];
const MOVE = new RequireKeyMap<string, (pos: NumberPair) => NumberPair>([
	['R', (pos) => [pos[0] + 1, pos[1] + 0]],
	['L', (pos) => [pos[0] - 1, pos[1] + 0]],
	['U', (pos) => [pos[0] + 0, pos[1] + 1]],
	['D', (pos) => [pos[0] + 0, pos[1] - 1]]
]);

const visited = new Set<string>(['0_0']);
const knotPositions: NumberPair[] = ArrayUtils.createWith(2, () => [0, 0]);

InputFile
	.readLinesForDay(9)
	.select(line => line.split(' '))
	.select(words => ({ command: words.get(0), count: parseInt(words.get(1)) }))
	.forEach(({ command, count }) =>
	{
		while (count-- > 0)
		{
			knotPositions[0] = MOVE.get(command)(knotPositions.get(0));
			for (let i = 0; i < knotPositions.length - 1; i++)
			{
				const first = knotPositions.get(i);
				const second = knotPositions.get(i + 1);
				const diffX = first[0] - second[0];
				const diffY = first[1] - second[1];
				if (first[1] === second[1] && Math.abs(diffX) > 1)
					second[0] = (diffX < 0) ? second[0] - 1 : second[0] + 1;
				else if (first[0] === second[0] && Math.abs(diffY) > 1)
					second[1] = (diffY < 0) ? second[1] - 1 : second[1] + 1;
				else if (first[0] != second[0] && first[1] != second[1] &&
					(Math.abs(diffX) > 1 || Math.abs(diffY) > 1))
				{
					second[0] = (diffX < 0) ? second[0] - 1 : second[0] + 1;
					second[1] = (diffY < 0) ? second[1] - 1 : second[1] + 1;
				}

				knotPositions[i+1] = second;
			}

			const tailPos = knotPositions.getLast();
			visited.add(`${tailPos[0]}_${tailPos[1]}`);
		}
	});

console.log(visited.size);
