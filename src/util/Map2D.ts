import Enumerable, { IEnumerable } from "linq";

const MAP_KEY_REGEX = /^(\d+)_(\d+)$/;
const CHECK_MIN = (val: number, min: number, _max: number) => val >= min;
const CHECK_MAX = (val: number, _min: number, max: number) => val <= max;
const DIRECTIONS = Enumerable.from([
	[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]);

export interface Entry2D<T>
{
	x: number;
	y: number;
	value: T;
}
export interface ActionableEntry2D<T> extends Entry2D<T>
{
	getValuesLeft(): IEnumerable<T>;
	getValuesRight(): IEnumerable<T>;
	getValuesUp(): IEnumerable<T>;
	getValuesDown(): IEnumerable<T>;
	getAdjacentEntries(): IEnumerable<Entry2D<T>>;
}

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
		this.maxX = values.get(0).length - 1;
		this.maxY = values.length - 1;
	}

	public containsPosition(x: number, y: number): boolean
	{
		return x >= 0 && x <= this.maxX && y >= 0 && y <= this.maxY;
	}

	public count(): number
	{
		return this.map.size;
	}

	public get(x: number, y: number): T
	{
		const found = this.map.get(Map2D.createMapKey(x, y));
		if (found === undefined)
			throw new Error(`No value found for (${x},${y}), max X: ${this.maxX}, max Y: ${this.maxY}`);
		return found;
	}

	public set(x: number, y: number, value: T): void
	{
		this.map.set(Map2D.createMapKey(x, y), value);
	}

	public getActionableEntries(): IEnumerable<ActionableEntry2D<T>>
	{
		return this
			.getEntries()
			.select(entry => this.createActionableEntry(entry));
	}

	public getAdjacentEntries(entry: Entry2D<T>): IEnumerable<Entry2D<T>>
	{
		return DIRECTIONS
			.select(dir => [entry.x + dir[0], entry.y + dir[1]].toPair())
			.where(pair => pair.first >= 0 && pair.first <= this.maxX)
			.where(pair => pair.second >= 0 && pair.second <= this.maxY)
			.select(pair => this.getEntry(pair.first, pair.second));
	}

	public getEntries(): IEnumerable<Entry2D<T>>
	{
		return Enumerable
			.from(this.map.entries())
			.select(item => Map2D.mapEntryToEntry2D(item));
	}

	public getEntry(x: number, y: number): Entry2D<T>
	{
		const value = this.get(x, y);
		return { x, y, value };
	}

	public getValuesLeftOf(entry: Entry2D<T>): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(0, entry.x - 1, entry.y, entry.y, true));
	}

	public getValuesRightOf(entry: Entry2D<T>): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x + 1, this.maxX, entry.y, entry.y));
	}

	public getValuesUpOf(entry: Entry2D<T>): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x, entry.x, 0, entry.y - 1, true));
	}

	public getValuesDownOf(entry: Entry2D<T>): IEnumerable<T>
	{
		return Enumerable.from(
			this.getValuesWithinLimits(entry.x, entry.x, entry.y + 1, this.maxY));
	}

	public indexOf(value: T): [number, number] | null
	{
		for (let x = 0; x <= this.maxX; x++)
			for (let y = 0; y <= this.maxY; y++)
				if (this.get(x, y) === value)
					return [x, y];
		return null;
	}

	public indexOfOrError(value: T): [number, number]
	{
		const found = this.indexOf(value);
		if (!found)
			throw new Error(`No index found for value: ${value}`);
		return found;
	}

	public indexesOf(value: T): IEnumerable<[number, number]>
	{
		return Enumerable.from(this.indexesOfInternal(value));
	}

	public static fromChars(input: IEnumerable<string>): Map2D<string>
	{
		return new Map2D(input
			.select(line => line.split(''))
			.toArray());
	}

	public static fromDigits(input: IEnumerable<string>): Map2D<number>
	{
		return new Map2D(input
			.select(line => line.split(''))
			.select(chars => chars.toIntArray())
			.toArray());
	}

	private createActionableEntry(entry: Entry2D<T>): ActionableEntry2D<T>
	{
		return {
			...entry,
			getValuesLeft: () => this.getValuesLeftOf(entry),
			getValuesRight: () => this.getValuesRightOf(entry),
			getValuesUp: () => this.getValuesUpOf(entry),
			getValuesDown: () => this.getValuesDownOf(entry),
			getAdjacentEntries: () => this.getAdjacentEntries(entry)
		};
	}

	private *getValuesWithinLimits(minX: number, maxX: number, minY: number, maxY: number, reverse = false): Generator<T>
	{
		const startX = reverse ? maxX : minX;
		const startY = reverse ? maxY : minY;

		const check = reverse ? CHECK_MIN : CHECK_MAX;
		const step = reverse ? -1 : 1;

		for (let x = startX; check(x, minX, maxX); x += step)
			for (let y = startY; check(y, minY, maxY); y += step)
				yield this.get(x, y);
	}

	private *indexesOfInternal(value: T): Generator<[number, number]>
	{
		for (let x = 0; x <= this.maxX; x++)
			for (let y = 0; y <= this.maxY; y++)
				if (this.get(x, y) === value)
					yield [x, y];
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
