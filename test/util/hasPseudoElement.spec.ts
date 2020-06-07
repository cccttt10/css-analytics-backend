import { expect } from 'chai';

import hasPseudoElement from '../../src/util/hasPseudoElement';

const pseudoElements: string[] = [
    ':selection',
    '::selection',
    'body:after',
    'body::after',
    '#some-id:after',
    '#some-id::after',
    '.some-selector > ul > li:before',
    '.some-selector > ul > li::before',
    'div::backdrop',
];

const nonPseudoElements: string[] = ['.foo-bar', '.foo-bar:first-child'];

describe('hasPseudoElement', () => {
    it('should return true when there is a pseudo element', () => {
        for (const pseudoElement of pseudoElements) {
            expect(hasPseudoElement(pseudoElement)).to.equal(true);
        }
    });

    it('should return false when there is no pseudo element', () => {
        for (const nonPseudoElement of nonPseudoElements) {
            expect(hasPseudoElement(nonPseudoElement)).to.equal(false);
        }
    });
});
