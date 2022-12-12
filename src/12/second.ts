
import jsGraphs from 'js-graph-algorithms';
import InputFile from '../util/InputFile';

const map = InputFile.readCharsMapForDay(12);
const graph = new jsGraphs.WeightedDiGraph((map.maxX + 1) * (map.maxY + 1));
const getGraphIndex = (x: number, y: number) => ((map.maxX + 1) * y) + x;

map
	.getActionableEntries()
	.selectMany(e => e.getAdjacentEntries()
		.select(e2 => [e, e2].toPair()))
	.where(({ first, second }) => {
		const code = first.value.replace('S', 'a').charCodeAt(0);
		const code2 = second.value.replace('E', 'z').charCodeAt(0);
		return code2 - code <= 1;
	})
	.forEach(({ first, second }) => {
		const index = getGraphIndex(first.x, first.y);
		const index2 = getGraphIndex(second.x, second.y);
		graph.addEdge(new jsGraphs.Edge(index, index2, 1));
	});

const endIndex = getGraphIndex(...map.indexOfOrError('E'));
console.log(map
	.indexesOf('a')
	.select(([ x, y ]) => getGraphIndex(x, y))
	.select(index => new jsGraphs.Dijkstra(graph, index))
	.where(dijkstra => dijkstra.hasPathTo(endIndex))
	.min(dijkstra => dijkstra.pathTo(endIndex).length));
