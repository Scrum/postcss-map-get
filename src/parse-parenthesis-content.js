/**
 * Get all the content inside brackets
 * @param {string} stringToParse string with parenthesis. This string must start with an `()`
 * @param {string} [startingPosition] to start parsing
 * @returns {{content: string, position: number}} All the content inside parenthesis including nested properties
 *
 * @todo might worth to parse the string until a `(` is found?
 */
export default function parseParenthesisContent(stringToParse, startingPosition = 0) {
  let position = startingPosition;
  let content = '';

  const stack = [];
  while (true) { // eslint-disable-line no-constant-condition
    const mapChracter = stringToParse[position];
    if (mapChracter === '(') {
      stack.push(mapChracter);
    } else if (mapChracter === ')') {
      stack.pop();
    }

    content += mapChracter;
    position++; // go ahead

    if (stack.length === 0) {
      break;
    }
  }

  return {content, position};
}
