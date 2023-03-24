import formatStylish from './stylish.js'
import formatJson from './json.js';

const formatDiff = (diffTree, format) => {
  if (format === 'stylish') {
    return formatStylish(diffTree);
  }
  if (format === 'json') {
    return formatJson(diffTree);
  }
  throw new Error('Unfortunately, this format is not supported.');
};
  
export default formatDiff;