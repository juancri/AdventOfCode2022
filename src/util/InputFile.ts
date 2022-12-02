
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

	public static readLineGroups(filename: string): IEnumerable<IEnumerable<string>>
	{
		return Enumerable.from(this
			.readFile(filename)
			.split('\n\n')
			.map(group => Enumerable.from(group.split('\n'))));
	}

	// Private methods

	private static readFile(filename: string): string
	{
		return fs
			.readFileSync(filename)
			.toString();
	}
}
