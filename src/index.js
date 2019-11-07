import postcss from 'postcss';
import strGetContent from './str-get-content';
import {METHOD} from './constant';

const getKeyFromMapString = (mapString, key) => {
  // Remove all whitespace character from the key
  const keyValue = key.replace(/\s/g, '');

  let requiredValue;

  mapString.split(',').some(completePropertyString => {
    if (completePropertyString.includes(':')) {
      const [key, value] = completePropertyString.split(':');
      if (key.trim() === keyValue) {
        requiredValue = value.trim();
      }
    } else {
      requiredValue = completePropertyString;
    }

    return Boolean(requiredValue);
  });

  return requiredValue;
};

const valResolve = val => {
  const {before, map, key, after} = strGetContent(val);

  return `${before}${getKeyFromMapString(map, key)}${after}`;
};

export default postcss.plugin('postcss-map-get', () => {
  return nodes => {
    nodes.walkDecls(decl => {
      let {value} = decl;

      if (value.includes(METHOD)) {
        decl.value = valResolve(decl.value);
      }
    });

    nodes.walkAtRules(rules => {
      const {params} = rules;

      if (params.includes(METHOD)) {
        rules.params = valResolve(params);
      }
    });
  };
});
