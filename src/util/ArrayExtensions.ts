
interface Array<T> {
	getFirst(): T;
}

Array.prototype.getFirst = function()
{
	if (this.length === 0)
		throw new Error('No items found in array');
	return this[0];
};

