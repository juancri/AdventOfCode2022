
export default class RequireKeyMap<K,V>
{
	private map: Map<K,V>;

	public constructor(entries: readonly (readonly [K, V])[] | null)
	{
		this.map = new Map(entries);
	}

	public get(key: K): V
	{
		const found = this.map.get(key);
		if (found === undefined)
			throw new Error(`Value not found for key: ${key}`);

		return found;
	}
}
