
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';

type Packet = number | Packet[];

const DIVIDER_PACKETS: Packet[] = [[[2]], [[6]]];

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
	// FIXME: Create a parser
	.select(line => eval(line) as Packet)
	.concat(DIVIDER_PACKETS)
	.orderBy(packet => packet, comparePackets)
	.select(IndexedItem.create)
	.where(x => DIVIDER_PACKETS.includes(x.item))
	.select(x => x.index + 1)
	.aggregate((a, b) => a * b));
