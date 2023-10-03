
import fs from 'fs';
import path from 'path';

import Handlebars from 'handlebars';

const NUMBER_MIN = 1;
const NUMBER_MAX = 25;
const TEMPLATE_DIR = path.join(__dirname, '../template');
const TEST_FILE = path.join(__dirname, '../runtests.sh');
const TEST_OUTPUT_DIR = path.join(__dirname, '../tests');

const SOURCE_TEMPLATE_FILE = path.join(TEMPLATE_DIR, 'run.template');
const SOURCE_TEMPLATE_CONTENTS = fs.readFileSync(SOURCE_TEMPLATE_FILE).toString();
const SOURCE_TEMPLATE = Handlebars.compile(SOURCE_TEMPLATE_CONTENTS);

const TEST_TEMPLATE_FILE = path.join(TEMPLATE_DIR, 'test.template');
const TEST_TEMPLATE_CONTENTS = fs.readFileSync(TEST_TEMPLATE_FILE).toString();
const TEST_TEMPLATE = Handlebars.compile(TEST_TEMPLATE_CONTENTS);

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
	const fileContents = SOURCE_TEMPLATE({ number, formattedNumber });
	for (const prefix of ['first', 'second'])
	{
		const codeFile = path.join(srcDir, `${prefix}.ts`);
		console.log(`Writing source file ${codeFile}...`);
		fs.writeFileSync(codeFile, fileContents);
	}

	// Add tests
	const testContents = TEST_TEMPLATE({ number, formattedNumber });
	fs.appendFileSync(TEST_FILE, testContents);

	// Add tests outputs
	const testOutputDir = path.join(TEST_OUTPUT_DIR, formattedNumber);
	console.log(`Creating directory ${testOutputDir}...`)
	fs.mkdirSync(testOutputDir);

	for (const prefix of ['first', 'second'])
	{
		const testOutputFile = path.join(TEST_OUTPUT_DIR, formattedNumber, `${prefix}.txt`);
		console.log(`Writing empty test output file ${testOutputFile}...`);
		fs.writeFileSync(testOutputFile, '');
	}

	// Done
	console.log('Done!');
}
catch (e)
{
	console.error(e);
}
