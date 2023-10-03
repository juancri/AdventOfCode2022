
import { readIntGroupsForDay } from '../util/InputFile';

console.log(readIntGroupsForDay(1)
	.max(group => group.sum()));
