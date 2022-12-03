
import fs from 'fs';
import { IEnumerable } from 'linq';

import './ArrayExtensions';

export default class InputFile
{
	public static readBitsForDay(day: number, skipEmpty = true): IEnumerable<number[]>
	{
		return this
			.readLinesForDay(day, skipEmpty)
			.select(line => line.split(''))
			.select(bits => bits.map(x => parseInt(x)));
	}

	public static readLinesForDay(day: number, skipEmpty = true): IEnumerable<string>
	{
		return this
			.readFileForDay(day)
			.split('\n')
			.toEnumerable()
			.where(line => !this.shouldSkip(line, skipEmpty));
	}

	public static readLineGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<string>>
	{
		return this
			.readFileForDay(day)
			.split('\n\n')
			.toEnumerable()
			.select(group => group
				.split('\n')
				.toEnumerable()
				.where(line => !this.shouldSkip(line, skipEmpty)));
	}

	public static readIntsForDay(day: number, skipEmpty = true): IEnumerable<number>
	{
		return this
			.readLinesForDay(day, skipEmpty)
			.select(line => parseInt(line));
	}

	public static readIntGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<number>>
	{
		return this
			.readLineGroupsForDay(day, skipEmpty)
			.select(group => group.select(line => parseInt(line)));
	}

	public static readIntGroupsOf2ForDay(day: number, skipEmpty = true): IEnumerable<[number, number]>
	{
		const ints = this.readIntsForDay(day, skipEmpty);
		return ints
			.zip(ints.skip(1), (a, b) => [a, b]);
	}

	public static readIntGroupsOf3ForDay(day: number, skipEmpty = true): IEnumerable<[number, number, number]>
	{
		const ints = this.readIntsForDay(day, skipEmpty);
		return ints
			.zip(ints.skip(1), (a, b) => ({ a, b }))
			.zip(ints.skip(2), (x, c) => [x.a, x.b, c]);
	}

	// Private methods

	private static getInputFilenameFromDay(day: number): string
	{
		const formattedNumber = day <= 9 ? `0${day}` : day.toString();
		return `input/${formattedNumber}.txt`;
	}

	private static readFile(filename: string): string
	{
		return fs
			.readFileSync(filename)
			.toString();
	}

	private static readFileForDay(day: number): string
	{
		return this.readFile(this.getInputFilenameFromDay(day));
	}

	private static shouldSkip(line: string, skipEmpty: boolean): boolean
	{
		return skipEmpty && line.length === 0;
	}
}
