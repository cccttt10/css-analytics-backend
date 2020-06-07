import { expect } from 'chai';

import hasAttributeSelector from '../../src/util/hasAttributeSelector';

const attributeSelectors: string[] = ['[hidden]', '[disabled]', '[type="string"]'];

const nonAttributeSelectors: string[] = ['foo', '#bar', 'li > li', '[]'];

describe('hasAttributeSelector', () => {
    it('should return true if there is an attribute selector', () => {
        for (const attributeSelector of attributeSelectors) {
            expect(hasAttributeSelector(attributeSelector)).to.equal(true);
        }
    });

    it('should return false when there is no attribute selector', () => {
        for (const nonAttributeSelector of nonAttributeSelectors) {
            expect(hasAttributeSelector(nonAttributeSelector)).to.equal(false);
        }
    });
});
