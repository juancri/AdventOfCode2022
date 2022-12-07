
import Graph from '../util/Graph';
import InputFile from '../util/InputFile';

const fs = new Graph<[string, number]>([ '/', 0 ]);
const stack = [fs.rootNode];

InputFile
	.readLinesForDay(7)
	.forEach(line => {
		const cd = line.match(/^\$ cd (.*)$/) as string[];
		const size = line.match(/^(\d+) (.*)$/) as string[];

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
	});

const currentlyUsed = fs
	.getAllValues()
	.sum(file => file[1]);
console.log(fs
	.getAllNodes()
	.select(nodes => nodes.getChildrenValuesRecursive())
	.select(files => files.sum(x => x[1]))
	.where(size => size >= -40_000_000 + currentlyUsed)
	.min());
