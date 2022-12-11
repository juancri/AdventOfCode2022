
export {};

declare global {
	interface RegExp {
		getInt(input: string, item?: number): number;
	}
}

RegExp.prototype.getInt = function(input, item = 0)
{
	const res = this.exec(input);
	if (!res)
		throw new Error(`Expression ${this} does not matches input ${input}`);
	const parts = res as string[];
	const part = parts.get(item);
	return parseInt(part);
}
