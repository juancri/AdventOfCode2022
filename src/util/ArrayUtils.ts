
export default class ArrayUtils
{
	public static getRepeatedItems<T>(lists: T[][]): T[] {
		if (lists.length == 0)
			return [];
		return (lists[0] as T[]).filter(l =>
			lists.every(a => a.includes(l)));
	}
}
