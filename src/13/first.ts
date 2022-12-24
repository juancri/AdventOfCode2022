
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';
import StringReader from '../util/StringReader';

type Packet = number | Packet[];

function parsePacket(reader: StringReader): Packet
{
	if (reader.peek()?.match(/\d/))
		return parseInt(reader.readWhileMatches(/\d/));

	reader.nextCheck('[');
	if (reader.nextIf(']'))
		return [];

	const items: Packet = [];
	while (true)
	{
		items.push(parsePacket(reader));
		if (reader.nextCheck(']', ',') === ']')
			return items;
	}
}

function comparePackets(left: Packet, right: Packet): number
{
	if (left === right)
		return 0;
	if (typeof left === 'number' && typeof right === 'number')
		return left < right ? -1 : 1;
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
	.readLineGroupsForDay(13)
	.select(g => g.select(StringReader.create))
	.select(g => g.select(parsePacket))
	.select(Pair.fromEnumerable)
	.select(IndexedItem.create)
	.where(({ item }) => comparePackets(item.first, item.second) < 0)
	.sum(({ index }) => index + 1));
