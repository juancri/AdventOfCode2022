
import Enumerable, { IEnumerable } from 'linq';
import IndexedItem from './IndexedItem';
import Pair from './Pair';

declare global {
	interface Array<T> {
		buffer(bufferSize: number): T[][];
		count(predicate?: (element: T, index: number) => boolean): number;
		countDistinct(): number;
		get(index: number): T;
		getFirst(): T;
		getLast(): T;
		min(selector?: (element: T) => number): number;
		max(selector?: (element: T) => number): number;
		pairWindows(): Pair<T>[];
		skipFirst(): T[];
		skipLast(): T[];
		spliceFromLast(count: number): T[];
		takeUntilIncluding(predicate: (element: T, index: number) => boolean): IEnumerable<T>
		toEnumerable(): IEnumerable<T>;
		toIntArray(): number[];
		toPair(): Pair<T>;
		windows(size: number): T[][];
		withIndex(): IndexedItem<T>[];
	}
}

Array.prototype.buffer = function(bufferSize: number)
{
	return Enumerable
		.from(this)
		.buffer(bufferSize)
		.toArray();
};

Array.prototype.count = function(predicate)
{
	return Enumerable
		.from(this)
		.count(predicate);
}

Array.prototype.countDistinct = function()
{
	return this
		.toEnumerable()
		.distinct()
		.count();
}

Array.prototype.get = function(index: number)
{
	const found = this.at(index);
	if (found === undefined)
		throw new Error(`No element found at index: ${index}`);
	return found;
};

Array.prototype.getFirst = function()
{
	if (this.length === 0)
		throw new Error('No items found in array');
	return this[0];
};

Array.prototype.getLast = function()
{
	if (this.length === 0)
		throw new Error('No items found in array');
	return this[this.length - 1];
};

Array.prototype.min = function(selector)
{
	return this.toEnumerable().min(selector);
}

Array.prototype.max = function(selector)
{
	return this.toEnumerable().max(selector);
}

Array.prototype.pairWindows = function()
{
	return this
		.windows(2)
		.map(item => item.toPair());
}

Array.prototype.spliceFromLast = function(count: number)
{
	return this.splice(this.length - count);
}

function *takeUntilIncludingInternal(array: any[], predicate: (element: any, index: number) => boolean)
{
	if (!array.length)
		return;
	for (let i = 0; i < array.length; i++)
	{
		yield array[i];
		if (predicate(array[i], i))
			return;
	}
}

Array.prototype.takeUntilIncluding = function(predicate)
{
	return Enumerable.from(takeUntilIncludingInternal(this, predicate));
}

Array.prototype.toEnumerable = function()
{
	return Enumerable.from(this);
}

Array.prototype.toIntArray = function()
{
	return this.map(x => parseInt(x.toString()));
}

Array.prototype.toPair = function()
{
	return Pair.fromArray(this);
}

Array.prototype.skipFirst = function()
{
	return this.slice(1);
}

Array.prototype.skipLast = function()
{
	return this.slice(0, this.length - 1);
}

Array.prototype.windows = function(size: number)
{
	return Enumerable
		.range(0, this.length - size + 1)
		.select(index => this.slice(index, index + size))
		.toArray();
};

Array.prototype.withIndex = function()
{
	return this.map(IndexedItem.create);
};
