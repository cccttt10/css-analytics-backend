import { expect } from 'chai';

import hasClassSelector from '../../../src/util/hasClassSelector';

const classSelectors: string[] = [
    '.foo',
    '#bar.foo',
    '.foo:after',
    '.foo::before',
    '[input="text"] .foo',
    'ul > li + li .baz',
];

const nonClassSelectors: string[] = [
    '#foo',
    'a',
    '[input="text"]',
    'a:visisted',
    'li + li',
];

describe('hasClassSelector', () => {
    it('should return true if there is a class selector', () => {
        for (const classSelector of classSelectors) {
            expect(hasClassSelector(classSelector)).to.equal(true);
        }
    });

    it('should return false if there is no class selector', () => {
        for (const nonClassSelector of nonClassSelectors) {
            expect(hasClassSelector(nonClassSelector)).to.equal(false);
        }
    });

    it('should return true if there is a class called foo', () => {
        classSelectors
            .filter(classSelector => classSelector.indexOf('foo') >= 0)
            .forEach(classSelector =>
                expect(hasClassSelector(classSelector, 'foo')).to.equal(true)
            );
    });

    it('should return false if there is no class called foo', () => {
        for (const nonClassSelector of nonClassSelectors) {
            expect(hasClassSelector(nonClassSelector, 'foo')).to.equal(false);
        }
    });
});
