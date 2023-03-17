const { makeDiff } = require('../src/makeDiff.js');
const { fs } = require('fs');
const { path } = require('path');

const genDiff = (filepath1, filepath2) => {
const file1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
const file2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
return makeDiff(file1, file2);
};

export default genDiff;
