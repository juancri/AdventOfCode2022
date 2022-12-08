import InputFile from '../util/InputFile';

const trees = InputFile
	.readLinesForDay(8)
	.select(line => line.split(''))
	.select(chars => chars.toIntArray())
	.toArray();

function getScore(i: number, j: number): number
{
	const height = trees.get(i).get(j);
	let localScore = 0;
	let score = 0;
	for (let i2 = i - 1; i2 >= 0; i2--)
	{
		if (trees.get(i2).get(j) < height)
			localScore++
		else
		{
			localScore++;
			break;
		}
	}

	score = localScore;
	localScore = 0;
	for (let i2 = i + 1; i2 < trees.length; i2++)
	{
		if (trees.get(i2).get(j) < height)
			localScore++
		else
		{
			localScore++;
			break;
		}
	}
	score *= localScore;
	localScore = 0;
	for (let j2 = j - 1; j2 >= 0; j2--)
	{
		if (trees.get(i).get(j2) < height)
			localScore++
		else
		{
			localScore++;
			break;
		}
	}
	score *= localScore;
	localScore = 0;
	for (let j2 = j + 1; j2 < trees.get(i).length; j2++)
	{
		if (trees.get(i).get(j2) < height)
			localScore++
		else
		{
			localScore++;
			break;
		}
	}
	score *= localScore;
	return score;
}

const results: number[] = [];
for (let i = 1; i < trees.length - 1; i++)
{
	const line = trees[i] as number[];
	for (let j = 1; j < line.length - 1; j++)
	{
		results.push(getScore(i, j));
	}
}

console.log(results
	.toEnumerable()
	.max());
