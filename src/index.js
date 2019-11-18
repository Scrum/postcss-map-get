import postcss from 'postcss';
import processValue from './process-value';
import {METHOD} from './constant';

export default postcss.plugin('postcss-map-get', () => {
  return nodes => {
    nodes.walkDecls(decl => {
      let {value} = decl;

      if (value.includes(METHOD)) {
        decl.value = processValue(decl.value);
      }
    });

    nodes.walkAtRules(rules => {
      const {params: parameters} = rules;

      if (parameters.includes(METHOD)) {
        rules.params = processValue(parameters);
      }
    });
  };
});
