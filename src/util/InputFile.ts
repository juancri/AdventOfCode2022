
import fs from 'fs';
import Enumerable, { IEnumerable } from 'linq';

export default class InputFile
{
	public static readLines(filename: string, skipEmpty = true): IEnumerable<string>
	{
		return Enumerable
			.from(this
				.readFile(filename)
				.split('\n'))
			.where(line => !skipEmpty || line.length > 0);
	}

	public static readLineGroups(filename: string, skipEmpty = true): IEnumerable<IEnumerable<string>>
	{
		return Enumerable.from(this
			.readFile(filename)
			.split('\n\n')
			.map(group => Enumerable
				.from(group.split('\n'))
				.where(line => !skipEmpty || line.length > 0)));
	}

	public static readInts(filename: string, skipEmpty = true): IEnumerable<number>
	{
		return this
			.readLines(filename, skipEmpty)
			.select(line => parseInt(line));
	}

	public static readIntGroups(filename: string, skipEmpty = true): IEnumerable<IEnumerable<number>>
	{
		return this
			.readLineGroups(filename, skipEmpty)
			.select(group => group.select(line => parseInt(line)));
	}

	// Private methods

	private static readFile(filename: string): string
	{
		return fs
			.readFileSync(filename)
			.toString();
	}
}
