import formatStylish from './stylish.js';
import formatJson from './json.js';

const formatDiff = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'json':
      return formatJson(diffTree);
    default:
      throw new Error('Unfortunately, this format is not supported.');
  }
};

export default formatDiff;
