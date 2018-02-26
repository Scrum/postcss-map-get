import postcss from 'postcss';
import test from 'ava';
import plugin from '../src';

const processing = (input, opts) => {
  return postcss([plugin(opts)]).process(input).css;
};

test('it should return body color for background', t => {
  const expected = 'body{background: #fff;}';
  const value = 'body{background: map-get((body: #fff,main-red: #c53831,link-blue: #0592fb) !default, body);}';
  t.is(processing(value), expected);
});

test('it should return body color and min-width width fro decl', t => {
  const expected = 'body{background: #fff;min-width: 1280px;}';
  const value = 'body{background: map-get((body: #fff,main-red: #c53831,link-blue: #0592fb) !default, body);min-width: map-get((xxs: 0,xs: 576px,sm: 768px,md: 992px,lg: 1280px,xl: 1360px,xxl: 1600px) !default, lg);}';
  t.is(processing(value), expected);
});

test('it should retunr width for at rule @media', t => {
  const expected = '@media (min-width: 1280px) {body {overflow-x: hidden}}';
  const value = '@media (min-width: map-get((xxs: 0,xs: 576px,sm: 768px,md: 992px,lg: 1280px,xl: 1360px,xxl: 1600px) !default, lg))) {body {overflow-x: hidden}}';
  t.is(processing(value), expected);
});

