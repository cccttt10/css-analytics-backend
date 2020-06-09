import { expect } from 'chai';

import hasPseudoClass from '../../../src/util/hasPseudoClass';

const pseudoClasses: string[] = [
    ':not(a)',
    'ul li:first-child',
    'a:visited',
    '*:active',
    '#some-id:nth-child(3)',
    '#some-id:nth-last-child(3)',
    '.some-selector > ul > li:hover',
    '.some-selector > ul > li:focus',
];

const nonPseudoClasses: string[] = ['.foo-bar', '.foo-bar:after', '.foo-bar::after'];

describe('hasPseudoClass', () => {
    it('should return true when there is a pseudo element', () => {
        for (const pseudoClass of pseudoClasses) {
            expect(hasPseudoClass(pseudoClass)).to.equal(true);
        }
    });

    it('should return false when there is no pseudo element', () => {
        for (const nonPseudoClass of nonPseudoClasses) {
            expect(hasPseudoClass(nonPseudoClass)).to.equal(false);
        }
    });
});
