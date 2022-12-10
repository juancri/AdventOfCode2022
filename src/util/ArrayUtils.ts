
export default class ArrayUtils
{
	public static create<T>(size: number, value: T): T[]
	{
		return Array(size)
			.fill(null)
			.map(() => value);
	}

	public static createWith<T>(size: number, getValue: () => T): T[]
	{
		return Array(size)
			.fill(null)
			.map(() => getValue());
	}

	public static getRepeatedItems<T>(lists: T[][]): T[]
	{
		return (lists[0] ?? []).filter(item =>
			lists.every(list => list.includes(item)));
	}

	public static transpose<T>(arrays: T[][], defaultValue: T): T[][]
	{
		const rows = arrays.length;
		const cols = arrays.get(0).length;
		const ret = [];
		for (let y = 0; y < cols; y++)
		{
			const newRow = [];
			for (let x = 0; x < rows; x++)
				newRow.push(arrays.get(x)[y] ?? defaultValue);
			ret.push(newRow);
		}

		return ret;
	}
}
