
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';

type Packet = number | Packet[];

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
	// FIXME: Create a parser
	.select(group => group.select(packet => eval(packet) as Packet))
	.select(Pair.fromEnumerable)
	.select(IndexedItem.create)
	.where(({ item }) => !!packetsInOrder(item.first, item.second))
	.sum(x => x.index + 1));
