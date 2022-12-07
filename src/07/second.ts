
import Enumerable from 'linq';
import Graph from '../util/Graph';
import InputFile from '../util/InputFile';

const graph = new Graph<[string, number]>([ '/', 0 ]);
const stack = [graph.rootNode];

InputFile
	.readLinesForDay(7)
	.forEach(line => {
		const cd = line.match(/^\$ cd (.*)$/) as string[];
		const sizeExp = line.match(/(\d+) (.*)$/) as string[];

		if (cd)
		{
			if (cd.get(1) === '..')
				stack.pop();
			else
				stack.push(stack
					.getLast()
					.addChildValue([ cd.get(1), 0 ]));
		}
		else if (sizeExp)
			stack
				.getLast()
				.addChildValue([
					sizeExp.get(2),
					parseInt(sizeExp.get(1)) ]);
	});

const currentlyUsed = Enumerable
	.from(graph.getChildrenValuesRecursive())
	.sum(file => file[1]);
console.log(Enumerable
	.from(graph.getChildrenNodesRecursive())
	.select(n => Enumerable.from(n.getChildrenValuesRecursive()))
	.select(values => values.sum(x => x[1]))
	.where(size => size >= -40_000_000 + currentlyUsed)
	.min());
