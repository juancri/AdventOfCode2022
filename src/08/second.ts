
import InputFile from '../util/InputFile';

console.log(InputFile
	.readDigitsMapForDay(8)
	.getActionableEntries()
	.select(t =>
		t.getValuesLeft(true)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesUp(true)
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesRight()
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesDown()
			.toArray()
			.TakeUntilIncluding(v => v >= t.value)
			.count())
	.max());
