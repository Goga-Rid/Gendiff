import fs from 'fs';
import * as path from 'path';
import makeDiff from './makeDiff.js';
import getParse from './parsers.js';
import formatDiff from './formatters/index.js';

// ------------------------------------ Basic functions for converting the relative path to a file------------------------------------
const absPath = (filepath) => path.resolve(process.cwd(), filepath).trim();

const getExtention = (filepath) => path.extname(filepath).slice(1).toLowerCase();

const getData = (filepath) => fs.readFileSync(absPath(filepath), 'utf-8');
// -----------------------------------------------------------------------------------------------------------------------------------
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getParse(getData(filepath1), getExtention(filepath1));
  const data2 = getParse(getData(filepath2), getExtention(filepath2));

  const diffTree = makeDiff(data1, data2);
  return formatDiff(diffTree, format);
};

export default genDiff;
