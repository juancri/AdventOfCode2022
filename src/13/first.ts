
import IndexedItem from '../util/IndexedItem';
import InputFile from '../util/InputFile';
import Pair from '../util/Pair';

type Packet = number | Packet[];

enum OrderResult
{
	True,
	False,
	Continue
}

function convertToList(packet: Packet): Packet[]
{
	return typeof packet === 'number' ? [packet] : packet;
}

function packetsInOrder(left: Packet, right: Packet): OrderResult
{
	const leftIsNumber = typeof left === 'number';
	const rightIsNumber = typeof right === 'number';
	if (leftIsNumber && rightIsNumber)
	{
		if (left === right)
			return OrderResult.Continue;

		return left < right ?
			OrderResult.True :
			OrderResult.False;
	}

	if (leftIsNumber || rightIsNumber)
		return packetsInOrder(convertToList(left), convertToList(right));

	const max = Math.max(left.length, right.length);
	for (let i = 0; i < max; i++)
	{
		if (left.length === i)
			return OrderResult.True;

		if (right.length === i)
			return OrderResult.False;

		const res = packetsInOrder(left.get(i), right.get(i));
		if (res !== OrderResult.Continue)
			return res;
	}

	return OrderResult.Continue;
}

console.log(InputFile
	.readLineGroupsForDay(13)
	// FIXME: Create a parser
	.select(group => group.select(packet => eval(packet) as Packet))
	.select(Pair.fromEnumerable)
	.select(IndexedItem.create)
	.where(({ item }) => packetsInOrder(item.first, item.second) === OrderResult.True)
	.sum(x => x.index + 1));
