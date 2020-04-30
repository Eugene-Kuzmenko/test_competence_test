import Comparator from './Comparator';

function makeComparatorTests(getComparator) {
  return ({a, b, compare, equal, greater, less, gte, lte}) => {
    const comp = getComparator();
    test(`compare(${a}, ${b}) returns ${compare}`, () => {
      expect(comp.compare(a, b)).toBe(compare)
    });
    test(`equal(${a}, ${b}) returns ${equal}`, () => {
      expect(comp.equal(a, b)).toBe(equal)
    });
    test(`greaterThan(${a}, ${b}) returns ${greater}`, () => {
      expect(comp.greaterThan(a, b)).toBe(greater)
    });
    test(`lessThan(${a}, ${b}) returns ${less}`, () => {
      expect(comp.lessThan(a, b)).toBe(less)
    });
    test(`greaterThanOrEqual(${a}, ${b}) returns ${gte}`, () => {
      expect(comp.greaterThanOrEqual(a, b)).toBe(gte)
    });
    test(`lessThanOrEqual(${a}, ${b}) returns ${lte}`, () => {
      expect(comp.lessThanOrEqual(a, b)).toBe(lte)
    });
  }
}

describe.each`
  a     | b     | compare | equal     | greater  | less     |  gte     |   lte
  ${5}  | ${5}  | ${0}    | ${true}   | ${false} | ${false} | ${true}  | ${true}
  ${2}  | ${3}  | ${-1}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3}  | ${2}  | ${1}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
  ${-4} | ${3}  | ${-1}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3}  | ${-4} | ${1}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
`('Default Comparator f($a, $b)', makeComparatorTests(() => new Comparator()));

describe.each`
  b     | a     | compare | equal     | greater  | less     |  gte     |   lte
  ${5}  | ${5}  | ${0}    | ${true}   | ${false} | ${false} | ${true}  | ${true}
  ${2}  | ${3}  | ${-1}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3}  | ${2}  | ${1}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
  ${-4} | ${3}  | ${-1}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3}  | ${-4} | ${1}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
`('Reversed Comparator f($a, $b)', makeComparatorTests(() => {
  const comp = new Comparator();
  comp.reverse();
  return comp;
}));

describe.each`
  a    | b     | compare | equal     | greater  | less     |  gte     |   lte
  ${5} | ${5}  | ${0}    | ${true}   | ${false} | ${false} | ${true}  | ${true}
  ${1} | ${3}  | ${-2}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3} | ${1}  | ${2}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
  ${-4}| ${3}  | ${-7}   | ${false}  | ${false} | ${true}  | ${false} | ${true}
  ${3} | ${-4} | ${7}    | ${false}  | ${true}  | ${false} | ${true}  | ${false}
`('Custom Comparator f($a, $b)', makeComparatorTests(() => new Comparator((a, b) => a - b)));
