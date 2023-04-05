import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 4 - 2);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const val = value[key];
    const formattedKey = `${indent(depth + 1)}${key}: `;
    const formattedValue = _.isObject(val) ? stringify(val, depth + 1) : String(val);
    return `${formattedKey}${formattedValue}`;
  });

  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const iter = (tree, depth = 1) => {
  const result = tree.flatMap((node) => { 
    const { key, type, value, oldValue, children } = node;
    switch (type) {
      case 'nested':
        return `${indent(depth)}  ${key}: {\n${iter(children, depth + 2)}\n${indent(depth)}}`;
      case 'added':
        return `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
      case 'updated':
        return [
          `${indent(depth)}- ${key}: ${stringify(oldValue, depth)}`,
          `${indent(depth)}+ ${key}: ${stringify(value, depth)}`,
        ];
      case 'unchanged':
        return `${indent(depth)}  ${key}: ${stringify(value, depth)}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });
  return result.join('\n');
};

const formatStylish = (data) => `{\n${iter(data)}\n}`;

export default formatStylish;