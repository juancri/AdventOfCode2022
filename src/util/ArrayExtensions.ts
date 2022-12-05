
import Enumerable, { IEnumerable } from 'linq';

declare global {
	interface Array<T> {
		buffer(bufferSize: number): T[][];
		getFirst(): T;
		toEnumerable(): IEnumerable<T>;
		toIntArray(): number[];
	}
}

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

Array.prototype.toEnumerable = function()
{
	return Enumerable.from(this);
}

Array.prototype.toIntArray = function()
{
	return this.map(x => parseInt(x.toString()));
}
