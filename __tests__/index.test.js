import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';
import formatStylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'expectedOutput', filename);
const fullReadFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// ----------------------------------Variables storing the correct data are further used to check--------------------------------------------------
const extentions = ['json', 'yml'];
const format = ['stylish', 'plain'];
const expStylish = fullReadFile('expectedStylishFormat.txt');
const expJson = fullReadFile('expectedJsonFormat.txt');
const expPlain = fullReadFile('expectedPlainFormat.txt');
// -----------------------------------
describe('Correct format testing', () => {
  test.each(extentions)('testing %s', (extension) => {
    const file1 = `${process.cwd()}/__fixtures__/file3.${extension}`;
    const file2 = `${process.cwd()}/__fixtures__/file4.${extension}`;

    expect(genDiff(file1, file2)).toEqual(expStylish);

    expect(genDiff(file1, file2, 'stylish')).toEqual(expStylish);

    expect(genDiff(file1, file2, 'json')).toEqual(expJson);
    expect(genDiff(file1, file2, 'json')).toEqual(expJson);

    expect(genDiff(file1, file2, 'json')).toEqual(expJson);

    expect(genDiff(file1, file2, 'plain')).toEqual(expPlain);

    expect(genDiff(file1, file2, 'plain')).toEqual(expPlain);
  });
});

describe('Check the wrong format', () => {
  test('testing', () => {
    expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'wrongFormat'))
      .toThrow('Unfortunately, this format is not supported.');
  });
});

describe('Check the wrong extension', () => {
  test.each(extentions)('testing', () => {
    expect(() => genDiff(`__fixtures__/file1.${!extentions}`, `__fixtures__/file2.${!extentions}`, 'format'))
      .toThrow('Invalid extension');
  });
});

describe('Check for incorrect type of file change', () => {
  test.each(format)('testing %s', () => {
    const data = [
      { key: 'name', type: 'nested', children: [] },
      { key: 'age', type: 'added', value: 12 },
      { key: 'address', type: 'invalid', value: 'Saint-Peterburg' },
    ];
    expect(() => formatStylish(data)).toThrow('Unknown type: ');
    expect(() => formatPlain(data)).toThrow('Unknown type: ');
  });
});
