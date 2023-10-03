
import { readIntGroupsForDay } from '../util/input';

console.log(readIntGroupsForDay(1)
	.select(group => group.sum())
	.orderByDescending(x => x)
	.take(3)
	.sum());
