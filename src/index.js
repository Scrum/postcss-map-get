import postcss from 'postcss';
import strNormalize from './str-normalize';
import strGetContent from './str-get-content';
import {METHOD, DIVIDER} from './constant';

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
const mapGet = val => {
  let [map, key] = val
    .split(DIVIDER)
    .map(value => {
      if (value.includes(':')) {
        return value.split(',')
          .reduce((map, string) => {
            const [key, value] = string.split(':');
            return Object.assign(map, {[key]: value});
          }, {});
      }

      return value;
    });

  return map[key];
};

const valResolve = val => {
  const value = strNormalize(val);
  const {start, content, end} = strGetContent(value);

  return `${start}${mapGet(content)}${end}`;
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
