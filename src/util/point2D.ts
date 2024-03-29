
export interface Point2D
{
	x: number;
	y: number
}

export function point2DFromArray(a: number[]): Point2D
{
	return {
		x: a.get(0),
		y: a.get(1)
	};
}

export function parsePoint2D(input: string, regexp: RegExp): Point2D
{
	const match = regexp.exec(input);
	if (!match)
		throw new Error('Regexp did not match');
	const x = parseFloat(match.groups?.['x'] ?? '');
	const y = parseFloat(match.groups?.['y'] ?? '');
	return { x, y };
}

export function getManhattanDistance(p1: Point2D, p2: Point2D): number
{
	return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}
