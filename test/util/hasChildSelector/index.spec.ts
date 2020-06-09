import { expect } from 'chai';

import hasChildSelector from '../../../src/util/hasChildSelector';

const childSelectors: string[] = ['ul>li', '.foo > .bar'];

const nonChildSelectors: string[] = ['foo', '#bar', 'li + li', '[]'];

describe('hasChildSelector', () => {
    it('should return true for child selectors', () => {
        for (const childSelector of childSelectors) {
            expect(hasChildSelector(childSelector)).to.equal(true);
        }
    });

    it('should return false for non-child selectors', () => {
        for (const nonChildSelector of nonChildSelectors) {
            expect(hasChildSelector(nonChildSelector)).to.equal(false);
        }
    });
});
