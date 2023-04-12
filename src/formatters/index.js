import formatStylish from './stylish.js';
import formatJson from './json.js';
import formatPlain from './plain.js';

const formatDiff = (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'json':
      return formatJson(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    default:
      throw new Error('Unfortunately, this format is not supported.');
  }
};

export default formatDiff;
