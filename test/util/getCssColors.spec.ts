import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
chai.use(assertArrays);

import getCssColors from '../../src/util/getCssColors';

const stringWithColors =
    'foobar hsl(,,) HSLA(1, 1.111%, 1.1111%, .8) rgba(123, 123, 123, .8) #fff turtles rebeccapurple #123AAA';

describe('getCssColors', () => {
    it('should get css colors', () => {
        expect(getCssColors(stringWithColors)).to.be.equalTo([
            'HSLA(1, 1.111%, 1.1111%, .8)',
            'rgba(123, 123, 123, .8)',
            '#fff',
            'rebeccapurple',
            '#123AAA',
        ]);
    });
});
