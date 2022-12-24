
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

	public nextCheck(): string
	{
		const next = this.next();
		if (next === null)
			throw new Error(`Reached the end of the string. Expected a character.`);
		return next;
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
