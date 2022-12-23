
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';
import StringReader from '../util/StringReader';

type Packet = number | Packet[];

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

function packetsInOrder(left: Packet, right: Packet): boolean | null
{
	if (typeof left === 'number' && typeof right === 'number')
		return left === right ? null : (left < right);
	if (typeof left === 'number')
		return packetsInOrder([left], right);
	if (typeof right === 'number')
		return packetsInOrder(left, [right]);

	for (let i = 0; i < Math.max(left.length, right.length); i++)
	{
		if (left.length === i)
			return true;

		if (right.length === i)
			return false;

		const res = packetsInOrder(left.get(i), right.get(i));
		if (res !== null)
			return res;
	}

	return null;
}

console.log(InputFile
	.readLineGroupsForDay(13)
	.select(g => g.select(StringReader.create))
	.select(g => g.select(parsePacket))
	.select(Pair.fromEnumerable)
	.select(IndexedItem.create)
	.where(({ item }) => !!packetsInOrder(item.first, item.second))
	.sum(({ index }) => index + 1));
