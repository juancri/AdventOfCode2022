
import { readIntGroupsForDay } from '../util/input';

console.log(readIntGroupsForDay(1)
	.max(group => group.sum()));
