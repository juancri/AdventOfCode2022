import { IEnumerable } from "linq";

export default class Pair<T>
{
	public readonly first: T;
	public readonly second: T;

	public constructor(first: T, second: T)
	{
		this.first = first;
		this.second = second;
	}

	public static fromArray<T>(a: T[]): Pair<T>
	{
		if (a.length !== 2)
			throw new Error(`Expected length of 2, got ${a.length}`);

		const first = a[0] as T;
		const second = a[1] as T;
		return new Pair(first, second);
	}

	public static fromEnumerable<T>(e: IEnumerable<T>): Pair<T>
	{
		return Pair.fromArray(e.toArray());
	}
}
