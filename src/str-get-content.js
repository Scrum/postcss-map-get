import {METHOD, DIVIDER, CLOSING_PARENTHESIS} from './constant';

export default value => {
  const start = value.indexOf(METHOD);
  const divider = value.indexOf(DIVIDER);
  const end = value.indexOf(CLOSING_PARENTHESIS, divider + DIVIDER.length);

  return {
    start: value.substr(0, start),
    content: value.substring(start + METHOD.length, end),
    end: value.substr(end + CLOSING_PARENTHESIS.length)
  };
};
