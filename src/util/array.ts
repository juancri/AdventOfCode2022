
export function create<T>(size: number, value: T): T[]
{
	return Array(size)
		.fill(null)
		.map(() => value);
}

export function createWith<T>(size: number, getValue: () => T): T[]
{
	return Array(size)
		.fill(null)
		.map(() => getValue());
}

export function getRepeatedItems<T>(lists: T[][]): T[]
{
	return (lists[0] ?? []).filter(item =>
		lists.every(list => list.includes(item)));
}

export function transpose<T>(arrays: T[][], defaultValue: T): T[][]
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
