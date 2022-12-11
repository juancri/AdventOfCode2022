
export {};

declare global {
	interface String {
		after(separator: string): string;
		get(index: number): string;
		toInt(): number;
	}
}

String.prototype.after = function(separator)
{
	const index = this.indexOf(separator);
	if (index < 0)
		throw new Error(`Separator ${separator} not found in string ${this}`);
	return this.substring(index + 1);
}

String.prototype.get = function(index)
{
	const res = this.at(index);
	if (res === undefined)
		throw new Error(`No chars found at index ${index} for string ${this}`);
	return res;
}

String.prototype.toInt = function()
{
	return parseInt(this as string);
}
