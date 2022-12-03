
export default class ArrayUtils
{
	public static getFirst<T>(a: T[]): T
	{
		if (a.length === 0)
			throw new Error('No items found in array');
		return a[0] as T;
	}

	public static getRepeatedItems<T>(lists: T[][]): T[]
	{
		if (lists.length == 0)
			return [];
		return (lists[0] as T[]).filter(l =>
			lists.every(a => a.includes(l)));
	}
}
