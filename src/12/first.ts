
import { WeightedDiGraph, Edge, Dijkstra } from 'js-graph-algorithms';
import { readCharsMapForDay } from '../util/input';

const map = readCharsMapForDay(12);
const graph = new WeightedDiGraph(map.count());
const getIndex = (x: number, y: number) => (map.maxX + 1) * y + x;

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
		getIndex(first.x, first.y),
		getIndex(second.x, second.y), 1)));

const startIndex = getIndex(...map.indexOfOrError('S'));
const endIndex = getIndex(...map.indexOfOrError('E'));
console.log(new Dijkstra(graph, startIndex).distanceTo(endIndex));
