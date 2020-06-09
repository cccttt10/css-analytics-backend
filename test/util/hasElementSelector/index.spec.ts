import { expect } from 'chai';

import hasElementSelector from '../../../src/util/hasElementSelector';

describe('hasElementSelector', () => {
    expect(hasElementSelector('#foo.bar li:first-child')).to.equal(true);
    expect(hasElementSelector('#foo.bar.li .ol.input')).to.equal(false);
});
