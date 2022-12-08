
import InputFile from '../util/InputFile';

console.log(InputFile
	.readDigitsMapForDay(8)
	.getActionableEntries()
	.count(t =>
		t.getValuesLeft().all(v => v < t.value) ||
		t.getValuesUp().all(v => v < t.value) ||
		t.getValuesRight().all(v => v < t.value) ||
		t.getValuesDown().all(v => v < t.value)));
