
import { readLinesForDay } from '../util/InputFile';
import Tree from '../util/Tree';

const fs = new Tree<[string, number]>([ '/', 0 ]);
const stack = [fs.root];

for (const line of readLinesForDay(7))
{
	const cd = line.match(/^\$ cd (.*)$/);
	const size = line.match(/^(\d+) (.*)$/);

	if (cd && cd.get(1) === '..')
		stack.pop();
	else if (cd && cd.get(1) !== '..')
		stack.push(stack
			.getLast()
			.addChildValue([ cd.get(1), 0 ]));
	else if (size)
		stack
			.getLast()
			.addChildValue([
				size.get(2),
				parseInt(size.get(1)) ]);
}

console.log(fs
	.getAllNodes()
	.select(node => node.getChildrenValuesRecursive())
	.select(files => files.sum(x => x[1]))
	.where(size => size <= 100_000)
	.sum());
