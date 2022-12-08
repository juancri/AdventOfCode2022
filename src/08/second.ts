
import InputFile from '../util/InputFile';

console.log(InputFile
	.readDigitsMapForDay(8)
	.getActionableEntries()
	.max(t =>
		t.getValuesLeft(true)
			.toArray()
			.takeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesUp(true)
			.toArray()
			.takeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesRight()
			.toArray()
			.takeUntilIncluding(v => v >= t.value)
			.count() *
		t.getValuesDown()
			.toArray()
			.takeUntilIncluding(v => v >= t.value)
			.count()));
