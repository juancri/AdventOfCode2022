
import fs from 'fs';
import Enumerable, { IEnumerable } from 'linq';

export default class InputFile
{
	public static readBitsForDay(day: number, skipEmpty = true): IEnumerable<number[]>
	{
		return this.readBits(this.getInputFilenameFromDay(day), skipEmpty);
	}

	public static readBits(filename: string, skipEmpty = true): IEnumerable<number[]>
	{
		return this.readLines(filename, skipEmpty)
			.select(line => line.split('').map(x => parseInt(x)));
	}

	public static readGroupedLinesForDay(day: number, groupSize: number, skipEmpty = true): IEnumerable<IEnumerable<string>>
	{
		return this.readGroupedLines(this.getInputFilenameFromDay(day), groupSize, skipEmpty);
	}

	public static readGroupedLines(filename: string, groupSize: number, skipEmpty = true): IEnumerable<IEnumerable<string>>
	{
		return this
			.readLines(filename, skipEmpty)
			.select((item, index) => ({ item, index }))
			.groupBy(x => Math.floor(x.index / groupSize))
			.select(g => g.select(x => x.item));
	}

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

	public static readIntGroupsOf2(filename: string, skipEmpty = true): IEnumerable<[number, number]>
	{
		const ints = this.readInts(filename, skipEmpty);
		return ints.zip(ints.skip(1), (a, b) => [a, b]);
	}

	public static readIntGroupsOf3ForDay(day: number, skipEmpty = true): IEnumerable<[number, number, number]>
	{
		return this.readIntGroupsOf3(this.getInputFilenameFromDay(day), skipEmpty);
	}

	public static readIntGroupsOf3(filename: string, skipEmpty = true): IEnumerable<[number, number, number]>
	{
		const ints = this.readInts(filename, skipEmpty);
		return ints
			.zip(ints.skip(1), (a, b) => ({ a, b }))
			.zip(ints.skip(2), (x, c) => [x.a, x.b, c]);
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
