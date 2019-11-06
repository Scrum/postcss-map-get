import postcss from 'postcss';
import strGetContent from './str-get-content';
import {METHOD} from './constant';

// const valResolve = value => {
//   const map = value.substring(
//     value.indexOf('((') + 2,
//     value.indexOf('),')
//   )
//     .split(',')
//     .reduce((map, string) => {
//       const [key, value] = string.split(':');
//       return Object.assign(map, {[key]: value});
//     }, {});

//   const key = value.substring(
//     value.indexOf('),') + 2,
//     value.lastIndexOf(')')
//   );

//   return map[key];
// };

// const replace = value => {
//   console.log(value);

//   //console.log(value.substr(0, start),value.substr(start, end),value.substr(end));
//   return `${value.substr(0, start)}${valResolve(value.substr(start, end))}${value.substr(end)}`;
// }

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
