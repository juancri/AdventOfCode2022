
export default class NumberUtils
{
	public static bitArrayToNumber(a: number[]): number
	{
		return a
			.map((n, index) => (n << (a.length - index - 1)))
			.reduce((prev, curr) => prev + curr);
	}
}
