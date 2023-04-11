const checkValue = (value) => {
  if (typeof (value) === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (diff) => {
  const makeFlat = (object, prefix = '') => {
    const result = object
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const {
          key, type, value, oldValue, children,
        } = node;
        const prefKey = prefix + key;
        switch (type) {
          case 'nested':
            return makeFlat(children, `${prefKey}.`);
          case 'added':
            return `Property '${prefKey}' was added with value: ${checkValue(value)}`;
          case 'removed':
            return `Property '${prefKey}' was removed`;
          case 'updated':
            return `Property '${prefKey}' was updated. From ${checkValue(oldValue)} to ${checkValue(value)}`;
          default:
            throw new Error(`Unknown type: ${type}`);
        }
      });

    return result.join('\n');
  };
  return makeFlat(diff);
};
export default formatPlain;
