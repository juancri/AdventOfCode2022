
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
