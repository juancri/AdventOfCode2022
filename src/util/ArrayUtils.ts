
export default class ArrayUtils
{
	public static getRepeatedItems<T>(lists: T[][]): T[] {
		return (lists[0] ?? []).filter(item =>
			lists.every(list => list.includes(item)));
	}
}
