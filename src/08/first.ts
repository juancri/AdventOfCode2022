
import InputFile from '../util/InputFile';

console.log(InputFile
	.readDigitsMapForDay(8)
	.getActionableEntries()
	.where(t =>
		t.getValuesLeft().all(v => v < t.value) ||
		t.getValuesUp().all(v => v < t.value) ||
		t.getValuesRight().all(v => v < t.value) ||
		t.getValuesDown().all(v => v < t.value))
	.count());
