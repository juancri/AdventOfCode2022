
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';
import StringReader from '../util/StringReader';

type Packet = number | Packet[];

const DIVIDER_PACKETS: Packet[] = [[[2]], [[6]]];

function parsePacket(reader: StringReader): Packet
{
	const char = reader.next();
	if (char === null)
		throw new Error('Unexpected end of input. Packet expected.');

	if (char.match(/\d/))
	{
		let numberInput = char;
		while (reader.peek()?.match(/\d/))
			numberInput += reader.next();
		return parseInt(numberInput);
	}

	if (char === '[')
	{
		if (reader.peek() === ']')
		{
			reader.next();
			return [];
		}

		const items: Packet = [];
		while (true)
		{
			items.push(parsePacket(reader));

			const next = reader.next();
			if (next === ']')
				break;
			if (next === ',')
				continue;

			throw new Error(`Unexpected input. Expected , or ]. Got: "${next}".`);
		}

		return items;
	}

	throw new Error(`Cannot parse input. Expected packet. Got: ${char}. Input: ${reader.input}. Pos: ${reader.pos}.`);
}

function comparePackets(left: Packet, right: Packet): number
{
	if (typeof left === 'number' && typeof right === 'number')
	{
		if (left === right)
			return 0;
		return left < right ? -1 : 1;
	}

	if (typeof left === 'number')
		return comparePackets([left], right);
	if (typeof right === 'number')
		return comparePackets(left, [right]);

	for (let i = 0; i < Math.max(left.length, right.length); i++)
	{
		if (left.length === i)
			return -1;

		if (right.length === i)
			return 1;

		const res = comparePackets(left.get(i), right.get(i));
		if (res !== 0)
			return res;
	}

	return 0;
}

console.log(InputFile
	.readLinesForDay(13)
	.select(StringReader.create)
	.select(parsePacket)
	.concat(DIVIDER_PACKETS)
	.orderBy(packet => packet, comparePackets)
	.select(IndexedItem.create)
	.where(x => DIVIDER_PACKETS.includes(x.item))
	.select(x => x.index + 1)
	.aggregate((a, b) => a * b));
