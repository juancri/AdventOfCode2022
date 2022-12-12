
import { WeightedDiGraph, Edge, Dijkstra } from 'js-graph-algorithms';
import InputFile from '../util/InputFile';

const map = InputFile.readCharsMapForDay(12);
const graph = new WeightedDiGraph(map.count());
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
	.forEach(({ first, second }) => graph.addEdge(new Edge(
		getGraphIndex(first.x, first.y),
		getGraphIndex(second.x, second.y), 1)));

const startPos = map.indexOfOrError('S');
const endPos = map.indexOfOrError('E');
const dijkstra = new Dijkstra(graph, getGraphIndex(...startPos));
const path = dijkstra.pathTo(getGraphIndex(...endPos));
console.log(path.length);
