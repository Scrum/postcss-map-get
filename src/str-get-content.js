import {METHOD, CLOSING_PARENTHESIS} from './constant';

export default value => {
  const escape = s => s.replace(/(\(|\))/g, '\\$1');
  const method = escape(METHOD);
  const closingParenthesis = escape(CLOSING_PARENTHESIS);

  /**
   * (.+)?map-get\(\((.+)\)(?:.+)?,(.+?)\)(.+)?
   *
   * (.+)?       – all elements before map-get (can be empty)
   * map-get\(   – function invocation
   * \(          - open map content
   * (.+)        - map content
   * \)          - close map content
   * (?:.+)?,    - match all elements before the key param (!default) and the coma
   * (.+?)       - key param gets all content unitl the first parenthesis
   * \)          - close parenthesis of function invocation
   * (.+)?       - all elements after map-get (can be empty)
   */
  const regExp = new RegExp(`(.+)?${method}(.+)${closingParenthesis}(?:.+)?,(.+?)${closingParenthesis}(.+)?`);
  const [, before = '', map, key, after = ''] = value.match(regExp);

  return {
    before,
    map,
    key,
    after
  };
};
