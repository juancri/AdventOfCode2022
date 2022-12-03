
import Enumerable from 'linq';

declare global {
	interface Array<T> {
		buffer(bufferSize: number): T[][];
		getFirst(): T;
	}
}

Array.prototype.buffer = function(bufferSize: number)
{
	return Enumerable
		.from(this)
		.buffer(bufferSize)
		.toArray()
};

Array.prototype.getFirst = function()
{
	if (this.length === 0)
		throw new Error('No items found in array');
	return this[0];
};

