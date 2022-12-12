
import jsGraphs from 'js-graph-algorithms';
import InputFile from '../util/InputFile';

const map = InputFile.readCharsMapForDay(12);
const graph = new jsGraphs.WeightedDiGraph((map.maxX + 1) * (map.maxY + 1));
let edges = 0;

function getGraphIndex(x: number, y: number): number
{
	return ((map.maxX + 1) * y) + x;
}

function getWeight(x: number, y: number, x2: number, y2: number): number
{
	const char = map.get(x, y);
	const char2 = map.get(x2, y2);
	if (char === 'S')
		return char2 === 'a' ? 1 : -1;
	if (char2 === 'E')
		return char === 'z' ? 1 : -1;

	const code = char.charCodeAt(0);
	const code2 = char2.charCodeAt(0);
	const diff = code2 - code;
	const weight = diff === 0 || diff === 1 ? 1 : -1;
	return weight;
}

function addEdge(x: number, y: number, x2: number, y2: number)
{
	if (x2 < 0 || x2 > map.maxX || y2 < 0 || y2 > map.maxY)
		return;

	const weight = getWeight(x, y, x2, y2);
	if (weight < 0)
		return;

	const index = getGraphIndex(x, y);
	const index2 = getGraphIndex(x2, y2);
	edges++;
	graph.addEdge(new jsGraphs.Edge(index, index2, weight));
}

for (let x = 0; x <= map.maxX; x++)
{
	for (let y = 0; y <= map.maxY; y++)
	{
		addEdge(x, y, x + 1, y);
		addEdge(x, y, x - 1, y);
		addEdge(x, y, x, y + 1);
		addEdge(x, y, x, y - 1);
	}
}

console.log(`edges: ${edges}`);
const startPos = map.indexOfOrError('S');
const endPos = map.indexOfOrError('E');
const startIndex = getGraphIndex(startPos[0], startPos[1]);
const endIndex = getGraphIndex(endPos[0], endPos[1]);
console.log(`from ${startPos} ${startIndex} to ${endPos} ${endIndex}`);
const dijkstra = new jsGraphs.Dijkstra(graph, startIndex);
if (dijkstra.hasPathTo(endIndex))
{
	const path = dijkstra.pathTo(endIndex);
	console.log(path);
	console.log(path.length);
}
else
{
	console.log('no path');
}
