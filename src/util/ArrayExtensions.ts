
import Enumerable, { IEnumerable } from 'linq';
import Pair from './Pair';

declare global {
	interface Array<T> {
		atCheck(index: number): T;
		buffer(bufferSize: number): T[][];
		getFirst(): T;
		getLast(): T;
		skipLast(): T[];
		spliceFromLast(count: number): T[];
		toEnumerable(): IEnumerable<T>;
		toIntArray(): number[];
		toPair(): Pair<T>;
	}
}

Array.prototype.atCheck = function(index: number)
{
	const found = this.at(index);
	if (found === undefined)
		throw new Error(`No element found at index: ${index}`);
	return found;
};

Array.prototype.buffer = function(bufferSize: number)
{
	return Enumerable
		.from(this)
		.buffer(bufferSize)
		.toArray();
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

Array.prototype.spliceFromLast = function(count: number)
{
	return this.splice(this.length - count);
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

Array.prototype.skipLast = function()
{
	return this.slice(0, this.length - 1);
}
