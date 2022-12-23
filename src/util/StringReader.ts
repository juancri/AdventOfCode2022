
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

	public peek(): string | null
	{
		return this.pos >= this.input.length ?
			null :
			this.input.at(this.pos) as string;
	}

	public static create(input: string): StringReader
	{
		return new StringReader(input);
	}
}
