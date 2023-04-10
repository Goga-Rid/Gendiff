import fs from 'fs';
import * as path from 'path';
import makeDiff from './makeDiff.js';
import getParse from './parsers.js';
import formatDiff from './formatters/index.js';

// ------------------------------------ Basic functions for converting the relative path to a file------------------------------------
const absPath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtention = (filepath) => path.extname(filepath).slice(1).toLowerCase();

const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');
// -----------------------------------------------------------------------------------------------------------------------------------
const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePathFile1 = absPath(filepath1);
  const absolutePathFile2 = absPath(filepath2);
  const extfile1 = getExtention(filepath1);
  const extfile2 = getExtention(filepath2);
  const file1 = getData(absolutePathFile1);
  const file2 = getData(absolutePathFile2);
  const data1 = getParse(file1, extfile1);
  const data2 = getParse(file2, extfile2);

  const diffTree = makeDiff(data1, data2);
  return formatDiff(diffTree, format);
};

export default genDiff;
