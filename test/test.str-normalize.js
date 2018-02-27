import test from 'ava';
import strNormalize from '../src/str-normalize';

test('it should return normalize string', t => {
  const expected1 = 'map-get((body:#fff,main-red:#c53831,link-blue:#0592fb),body)';
  const value1 = 'map-get((body: #fff,main-red: #c53831,link-blue: #0592fb) !default, body)';

  const expected2 = 'map-get((xxs:0,xs:576px,sm:768px,md:992px,lg:1280px,xl:1360px,xxl:1600px),lg)';
  const value2 = 'map-get((xxs: 0,xs: 576px,sm: 768px,md: 992px,lg: 1280px,xl: 1360px,xxl: 1600px) !default, lg)';

  const expected3 = '(min-width:map-get((xxs:0,xs:576px,sm:768px,md:992px,lg:1280px,xl:1360px,xxl:1600px),lg))';
  const value3 = '(min-width: map-get((xxs: 0,xs: 576px,sm: 768px,md: 992px,lg: 1280px,xl: 1360px,xxl: 1600px) !default, lg))';

  const expected4 = '(map-get((xxs:0,xs:576px,sm:768px,md:992px,lg:1280px,xl:1360px,xxl:1600px),lg)-17)';
  const value4 = '(map-get((xxs: 0,xs: 576px,sm: 768px,md: 992px,lg: 1280px,xl: 1360px,xxl: 1600px) !default, lg) - 17)';

  t.is(strNormalize(value1), expected1);
  t.is(strNormalize(value2), expected2);
  t.is(strNormalize(value3), expected3);
  t.is(strNormalize(value4), expected4);
});
