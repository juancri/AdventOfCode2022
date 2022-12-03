
import fs from 'fs';
import Enumerable, { IEnumerable } from 'linq';

export default class InputFile
{
	public static readLinesForDay(day: number, skipEmpty = true): IEnumerable<string>
	{
		return this.readLines(this.getInputFilenameFromDay(day), skipEmpty);
	}

	public static readLines(filename: string, skipEmpty = true): IEnumerable<string>
	{
		return Enumerable
			.from(this
				.readFile(filename)
				.split('\n'))
			.where(line => !skipEmpty || line.length > 0);
	}

	public static readLineGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<string>>
	{
		return this.readLineGroups(this.getInputFilenameFromDay(day), skipEmpty);
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

	public static readIntsForDay(day: number, skipEmpty = true): IEnumerable<number>
	{
		return this.readInts(this.getInputFilenameFromDay(day), skipEmpty);
	}

	public static readInts(filename: string, skipEmpty = true): IEnumerable<number>
	{
		return this
			.readLines(filename, skipEmpty)
			.select(line => parseInt(line));
	}

	public static readIntGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<number>>
	{
		return this.readIntGroups(this.getInputFilenameFromDay(day), skipEmpty);
	}

	public static readIntGroups(filename: string, skipEmpty = true): IEnumerable<IEnumerable<number>>
	{
		return this
			.readLineGroups(filename, skipEmpty)
			.select(group => group.select(line => parseInt(line)));
	}

	// Private methods

	private static getInputFilenameFromDay(day: number): string
	{
		const formattedNumber = day < 9 ? `0${day}` : day.toString();
		return `input/${formattedNumber}.txt`;
	}

	private static readFile(filename: string): string
	{
		return fs
			.readFileSync(filename)
			.toString();
	}
}
