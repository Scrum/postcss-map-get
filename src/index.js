import postcss from 'postcss';

const METHOD = 'map-get';

const valResolve = value => {
  const map = value.substring(
      value.indexOf('((') + 2,
      value.indexOf('),')
    )
    .split(',')
    .reduce((map, string) => {
      const [key, value] = string.split(':');
      return Object.assign(map, {[key]: value})
    }, {});

  const key = value.substring(
    value.indexOf('),') + 2,
    value.lastIndexOf(')')
  );

  return map[key];
}

const normalize = value => value.replace(/(\s|!default)/g, '');

export default postcss.plugin('postcss-map-get', () => {
    return nodes => {
        nodes.walkDecls(decl => {
          let {value} = decl;

          if (value.startsWith(METHOD)) {
            decl.value = valResolve(normalize(decl.value));
          }
        });
    };
});
