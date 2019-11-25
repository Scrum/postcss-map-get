import test from 'ava';
import parseParenthesisContent from '../src/parse-parenthesis-content';

const tests = [
  {
    stringToParse: '(foo: bar) something else',
    expectedContent: '(foo: bar)'
  },
  {
    stringToParse: '(foo: bar, asd: (innerFoo: innerBar)) something else',
    expectedContent: '(foo: bar, asd: (innerFoo: innerBar))'
  },
  {
    stringToParse: '(foo: bar, asd: (innerFoo: (deepFoo: deepBar))) something else',
    expectedContent: '(foo: bar, asd: (innerFoo: (deepFoo: deepBar)))'
  },
  {
    stringToParse: 'before(foo: bar, asd: (innerFoo: (deepFoo: deepBar))) something else',
    startPosition: 6,
    expectedContent: '(foo: bar, asd: (innerFoo: (deepFoo: deepBar)))'
  }
];

tests.forEach(({stringToParse, startPosition, expectedContent}, testIndex) => {
  test(`parse-parenthesis-content ${testIndex} – "${stringToParse}" should result in "${expectedContent}"`, function (t) {
    const output = parseParenthesisContent(stringToParse, startPosition);

    t.deepEqual(output.content, expectedContent);

    const expectedPosition = stringToParse.indexOf(expectedContent) + expectedContent.length;
    t.deepEqual(output.position, expectedPosition);
  });
});

test('it should throw an error when number of parenthesis is not exact', t => {
  // missing parenthesis position:                     ↓
  const value = '(map-get((corporate: (textColor: green, ea: (textColor: black), corporate), textColor)';

  const testError = t.throws(() => {
    parseParenthesisContent(value);
  }, null);

  t.is(testError.message, 'postcss – map-get – parenthesis not closed');
});
