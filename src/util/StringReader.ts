
export default class StringReader
{
	public input: string;
	public pos: number;

	public constructor(input: string)
	{
		this.input = input;
		this.pos = 0;
	}

	public next(): string | null
	{
		return this.pos >= this.input.length ?
			null :
			this.input.at(this.pos++) as string;
	}

	public nextIf(value: string): boolean
	{
		if (this.peek() !== value)
			return false;

		this.next();
		return true;
	}

	public nextCheck(...values: (string | RegExp)[]): string
	{
		const next = this.next();
		if (next === null)
			throw new Error(`Reached the end of the string. Expected a character.`);
		if (values.length === 0)
			return next;

		for (const value of values)
		{
			if (typeof value === 'string' && value === next)
				return next;
			if (next.match(value))
				return next;
		}

		throw new Error(`Next value "${next}" does not matches any of the values provided`);
	}

	public peek(): string | null
	{
		return this.pos >= this.input.length ?
			null :
			this.input.at(this.pos) as string;
	}

	public readWhileMatches(exp: RegExp): string
	{
		let result = '';
		while (this.peek()?.match(exp))
			result += this.nextCheck();

		return result;
	}

	public static create(input: string): StringReader
	{
		return new StringReader(input);
	}
}
