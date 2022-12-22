
export default class IndexedItem<T>
{
	public readonly index: number;
	public readonly item: T;

	public constructor(item: T, index: number)
	{
		this.item = item;
		this.index = index;
	}

	public static create<T>(item: T, index: number): IndexedItem<T>
	{
		return new IndexedItem(item, index);
	}
}
