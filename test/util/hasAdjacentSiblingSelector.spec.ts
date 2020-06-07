import { expect } from 'chai';

import hasAdjacentSiblingSelector from '../../src/util/hasAdjacentSiblingSelector';

const adjacentSiblingSelectors: string[] = ['li + li', '#foo .bar .baz + .baz'];

const nonAdjacentSiblingSelectors: string[] = ['foo', '#bar', 'li > li'];

describe('hasAdjacentSiblingSelector', () => {
    it('should return true for adjacent sibling selectors', () => {
        for (const adjacentSiblingSelector of adjacentSiblingSelectors) {
            expect(hasAdjacentSiblingSelector(adjacentSiblingSelector)).to.equal(
                true
            );
        }
    });

    it('should return false for non adjacent sibling selectors', () => {
        for (const nonAdjacentSiblingSelector of nonAdjacentSiblingSelectors) {
            expect(hasAdjacentSiblingSelector(nonAdjacentSiblingSelector)).to.equal(
                false
            );
        }
    });
});
