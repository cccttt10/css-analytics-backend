import { expect } from 'chai';

import hasIdSelector from '../../../src/util/hasIdSelector';

const idSelectors: string[] = [
    '.foo #bar',
    '#bar.foo',
    '#bar::after',
    '#bar:after',
    '[input="text"] #foo',
    'ul > li + li #baz',
    'element#baz',
];

const nonIdSelectors: string[] = [
    '.foo',
    'a',
    '[input="text"]',
    'a:visisted',
    'li + li',
    '[href="#anchor"]',
];

describe('hasIdSelector', () => {
    it('should return true if there is an id selector', () => {
        for (const idSelector of idSelectors) {
            expect(hasIdSelector(idSelector)).to.equal(true);
        }
    });

    it('should return false if there is no id selector', () => {
        for (const nonIdSelector of nonIdSelectors) {
            expect(hasIdSelector(nonIdSelector)).to.equal(false);
        }
    });

    it('should return true if there is an id selector called bar', () => {
        idSelectors
            .filter(idSelector => idSelector.indexOf('bar') >= 0)
            .forEach(idSelector =>
                expect(hasIdSelector(idSelector, 'bar')).to.equal(true)
            );
    });

    it('should return false if there is no id selector called bar', () => {
        for (const nonIdSelector of nonIdSelectors) {
            expect(hasIdSelector(nonIdSelector, 'bar')).to.equal(false);
        }
    });
});
