
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
		const cd = line.match(/^\$ cd (.*)$/);
		const sizeExp = line.match(/(\d+) (.*)$/);

		if (cd)
		{
			const dir = cd[1] as string;
			if (dir === '..')
				stack.pop();
			else
				stack.push(stack
					.getLast()
					.addChildValue({ name: dir, size: 0, isDir: true }));
		}
		else if (sizeExp)
		{
			const name = sizeExp[2] as string;
			const size = parseInt(sizeExp[1] as string);
			stack
				.getLast()
				.addChildValue({ name, size, isDir: false });
		}
	});

const totalSpace = 70_000_000;
const targetFree = 30_000_000;
const currentlyUsed = Enumerable
	.from(graph.getChildrenValuesRecursive())
	.sum(file => file.size);
const currentlyFree = totalSpace - currentlyUsed;
const needToFree = targetFree - currentlyFree;

console.log(Enumerable
	.from(graph.getChildrenNodesRecursive())
	.where(n => n.value.isDir)
	.select(n => Enumerable.from(n.getChildrenValuesRecursive()))
	.select(values => values.sum(x => x.size))
	.where(size => size >= needToFree)
	.min());
