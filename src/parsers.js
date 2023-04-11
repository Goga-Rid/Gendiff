import yaml from 'js-yaml';

const getParse = (filepath, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(filepath);
    case 'yml':
      return yaml.load(filepath);
    default:
      throw new Error('Invalid extension');
  }
};

export default getParse;
