
import fs from 'fs';
import { IEnumerable } from 'linq';

import './ArrayExtensions';
import Map2D from './Map2D';

function getInputFilenameFromDay(day: number): string
{
	const formattedNumber = day <= 9 ? `0${day}` : day.toString();
	return `input/${formattedNumber}.txt`;
}

function readFile(filename: string): string
{
	return fs
		.readFileSync(filename)
		.toString();
}

function shouldSkip(line: string, skipEmpty: boolean): boolean
{
	return skipEmpty && line.length === 0;
}

export function readBitsForDay(day: number, skipEmpty = true): IEnumerable<number[]>
{
	return readLinesForDay(day, skipEmpty)
		.select(line => line.split(''))
		.select(bits => bits.map(x => parseInt(x)));
}

export function readCharsForDay(day: number, trim = true): string[]
{
	let input = readFileForDay(day);
	if (trim)
		input = input.trim();
	return input.split('');
}

export function readCharsMapForDay(day: number): Map2D<string>
{
	return Map2D.fromChars(readLinesForDay(day, true));
}

export function readDigitsMapForDay(day: number): Map2D<number>
{
	return Map2D.fromDigits(readLinesForDay(day, true));
}

export function readFileForDay(day: number): string
{
	return readFile(getInputFilenameFromDay(day));
}

export function readLinesForDay(day: number, skipEmpty = true): IEnumerable<string>
{
	return readFileForDay(day)
		.split('\n')
		.toEnumerable()
		.where(line => !shouldSkip(line, skipEmpty));
}

export function readLineGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<string>>
{
	return readFileForDay(day)
		.split('\n\n')
		.toEnumerable()
		.select(group => group
			.split('\n')
			.toEnumerable()
			.where(line => !shouldSkip(line, skipEmpty)));
}

export function readIntsForDay(day: number, skipEmpty = true): IEnumerable<number>
{
	return readLinesForDay(day, skipEmpty)
		.select(line => parseInt(line));
}

export function readIntGroupsForDay(day: number, skipEmpty = true): IEnumerable<IEnumerable<number>>
{
	return readLineGroupsForDay(day, skipEmpty)
		.select(group => group.select(line => parseInt(line)));
}

export function readIntGroupsOf2ForDay(day: number, skipEmpty = true): IEnumerable<[number, number]>
{
	const ints = readIntsForDay(day, skipEmpty);
	return ints
		.zip(ints.skip(1), (a, b) => [a, b]);
}

export function readIntGroupsOf3ForDay(day: number, skipEmpty = true): IEnumerable<[number, number, number]>
{
	const ints = readIntsForDay(day, skipEmpty);
	return ints
		.zip(ints.skip(1), (a, b) => ({ a, b }))
		.zip(ints.skip(2), (x, c) => [x.a, x.b, c]);
}
