
import fs from 'fs';
import path from 'path';

import Handlebars from 'handlebars';

const NUMBER_MIN = 1;
const NUMBER_MAX = 25;
const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const TEMPLATE_FILE = path.join(TEMPLATE_DIR, 'run.template');
const TEMPLATE_CONTENTS = fs.readFileSync(TEMPLATE_FILE).toString();
const TEMPLATE = Handlebars.compile(TEMPLATE_CONTENTS);

try
{
	// Validate
	if (process.argv.length < 3)
		throw new Error('Please specify number');
	const numberString = process.argv[2] as string;
	const number = parseInt(numberString);
	if (number < NUMBER_MIN || number > NUMBER_MAX)
		throw new Error(`Number out of bound: ${number} min: ${NUMBER_MIN} max: ${NUMBER_MAX}`);

	// Create directory
	const formattedNumber = number < 10 ? `0${number}` : number.toString();
	const srcDir = path.join(__dirname, '../src', formattedNumber);
	console.log(`Creating directory ${srcDir}...`);
	fs.mkdirSync(srcDir);

	// Create input file
	const inputDir = path.join(__dirname, '../input');
	const inputFile = path.join(inputDir, `${formattedNumber}.txt`);
	console.log(`Writing input file ${inputFile}...`);
	fs.writeFileSync(inputFile, '');

	// Create file
	const fileContents = TEMPLATE({ number: formattedNumber });
	const codeFile = path.join(srcDir, 'run.ts');
	console.log(`Writing source file ${codeFile}...`);
	fs.writeFileSync(codeFile, fileContents);

	// Done
	console.log('Done!');
}
catch (e)
{
	console.error(e);
}
