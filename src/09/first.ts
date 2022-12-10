
import Enumerable from 'linq';
import InputFile from '../util/InputFile';

function posToString(pos: [number, number]): string
{
	return `${pos[0]}_${pos[1]}`;
}

function getNextPositions(headPos: [number, number], tailPos: [number, number]): [number, number]
{

	const diffX = Math.abs(headPos[0] - tailPos[0]);
	const diffY = Math.abs(headPos[1] - tailPos[1]);
	if (headPos[1] == tailPos[1] && diffX > 1)
		tailPos[0] = (headPos[0] - tailPos[0] < 0) ? tailPos[0] - 1 : tailPos[0] + 1;
	if (headPos[0] == tailPos[0] && diffY > 1)
		tailPos[1] = (headPos[1] - tailPos[1] < 0) ? tailPos[1] - 1 : tailPos[1] + 1;
	if (headPos[0] != tailPos[0] && headPos[1] != tailPos[1] && (diffX > 1 || diffY > 1))
	{
		tailPos[0] = (headPos[0] - tailPos[0] < 0) ? tailPos[0] - 1 : tailPos[0] + 1;
		tailPos[1] = (headPos[1] - tailPos[1] < 0) ? tailPos[1] - 1 : tailPos[1] + 1;
	}

	return tailPos;
}

const visited = new Set<string>();

const knotPositions: [number, number][] = [
	[0,0], // head
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0] // tail
];

visited.add(posToString(knotPositions.getLast()));

InputFile
	.readLinesForDay(9)
	.select(line => line.split(' '))
	.select(parts => parts.toPair())
	.select(pair => ({ command: pair.first, count: parseInt(pair.second) }))
	.forEach(({ command, count }) =>
	{
		while (count-- > 0)
		{
			// Move head
			let  headPos = knotPositions[0] as [number, number];
			if (command === 'R')
				headPos = [headPos[0] + 1, headPos[1]];
			if (command === 'L')
				headPos = [headPos[0] - 1, headPos[1]];
			if (command === 'U')
				headPos = [headPos[0], headPos[1] - 1];
			if (command === 'D')
				headPos = [headPos[0], headPos[1] + 1];

			knotPositions[0] = headPos;
			for (let i = 0; i < knotPositions.length - 1; i++)
			{
				const first = knotPositions.get(i);
				const second = knotPositions.get(i + 1);
				const newPos = getNextPositions(first, second);
				knotPositions[i+1] = newPos;
			}

			visited.add(posToString(knotPositions.getLast()));
		}
	});

console.log(visited.entries());
console.log(knotPositions);
console.log(Enumerable
	.from(visited.entries())
	.distinct()
	.count());


