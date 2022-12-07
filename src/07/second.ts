
import Enumerable from 'linq';
import Graph, { Node } from '../util/Graph';
import InputFile from '../util/InputFile';

interface File
{
	name: string;
	size: number;
	isDir: boolean;
}

const graph = new Graph<File>({ name: '/', size: 0, isDir: true });
const stack: Node<File>[] = [graph.rootNode];

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
					.addChildValue({ name: cd.get(1), size: 0, isDir: true }));
		}
		else if (sizeExp)
		{
			stack
				.getLast()
				.addChildValue({
					name: sizeExp.get(2),
					size: parseInt(sizeExp.get(1)),
					isDir: false });
		}
	});

const currentlyUsed = Enumerable
	.from(graph.getChildrenValuesRecursive())
	.sum(file => file.size);
console.log(Enumerable
	.from(graph.getChildrenNodesRecursive())
	.where(n => n.value.isDir)
	.select(n => Enumerable.from(n.getChildrenValuesRecursive()))
	.select(values => values.sum(x => x.size))
	.where(size => size >= -40_000_000 + currentlyUsed)
	.min());
