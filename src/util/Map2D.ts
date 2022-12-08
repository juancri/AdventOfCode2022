import Enumerable, { IEnumerable } from "linq";

const MAP_KEY_REGEX = /^(\d+)_(\d+)$/;
const CHECK_MIN = (val: number, min: number, _max: number) => val >= min;
const CHECK_MAX = (val: number, _min: number, max: number) => val <= max;

export type Entry2D<T> = { x: number, y: number, value: T };

export default class Map2D<T>
{
	private map: Map<string, T>;
	public readonly maxX: number;
	public readonly maxY: number;

	public constructor(values: T[][])
	{
		if (values.length === 0)
			throw new Error('No rows found');
		if (values.get(0).length === 0)
			throw new Error('No columns found');

		this.map = new Map<string, T>(values
			.toEnumerable()
			.selectMany((values, yIndex) => values.map((val, xIndex) => ({ xIndex, yIndex, val })))
			.select(x => [Map2D.createMapKey(x.xIndex, x.yIndex), x.val] as [string, T]));
		console.log(Array.from(this.map.entries()));
		this.maxX = values.get(0).length - 1;
		this.maxY = values.length - 1;
	}

	public get(x: number, y: number): T
	{
		const found = this.map.get(Map2D.createMapKey(x, y));
		if (found === undefined)
			throw new Error(`No value found for (${x},${y}), max X: ${this.maxX}, max Y: ${this.maxY}`);
		return found;
	}

	public getEntries(): IEnumerable<Entry2D<T>>
	{
		return Enumerable
			.from(this.map.entries())
			.select(item => Map2D.mapEntryToEntry2D(item));
	}

	public getValuesLeftOf(entry: Entry2D<T>, reverse = false): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(0, entry.x - 1, entry.y, entry.y, reverse));
	}

	public getValuesRightOf(entry: Entry2D<T>, reverse = false): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x + 1, this.maxX, entry.y, entry.y, reverse));
	}

	public getValuesUpOf(entry: Entry2D<T>, reverse = false): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x, entry.x, 0, entry.y - 1, reverse));
	}

	public getValuesDownOf(entry: Entry2D<T>, reverse = false): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x, entry.x, entry.y + 1, this.maxY, reverse));
	}

	private *getValuesWithinLimits(minX: number, maxX: number, minY: number, maxY: number, reverse: boolean): Generator<T>
	{
		const startX = reverse ? maxX : minX;
		const startY = reverse ? maxY : minY;

		const check = reverse ? CHECK_MIN : CHECK_MAX;
		const step = reverse ? -1 : 1;

		for (let x = startX; check(x, minX, maxX); x += step)
			for (let y = startY; check(y, minY, maxY); y += step)
				yield this.get(x, y);
	}

	private static createMapKey(x: number, y: number): string
	{
		return `${x}_${y}`;
	}

	private static mapEntryToEntry2D<T>(mapEntry: [string, T]): Entry2D<T>
	{
		const match = MAP_KEY_REGEX.exec(mapEntry[0]);
		if (!match)
			throw new Error(`Map key does not have the right format: ${mapEntry[0]}`);

		const x = parseInt(match.get(1));
		const y = parseInt(match.get(2));
		const value = mapEntry[1];
		return { x, y, value };
	}
}
