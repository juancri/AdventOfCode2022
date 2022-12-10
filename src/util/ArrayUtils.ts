
export default class ArrayUtils
{
	public static createWith<T>(size: number, getValue: () => T): T[]
	{
		return Array(size)
			.fill(null)
			.map(() => getValue());
	}

	public static getRepeatedItems<T>(lists: T[][]): T[] {
		return (lists[0] ?? []).filter(item =>
			lists.every(list => list.includes(item)));
	}
}
