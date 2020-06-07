import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
chai.use(assertArrays);

import cssUnitSort from '../../src/util/cssSortUnits/';

describe('cssSortUnits', () => {
    it('should sort css units', () => {
        expect(
            cssUnitSort([
                '2rem',
                'inherit',
                'small',
                '12px',
                '20px',
                '60px',
                '1.5em',
            ])
        ).to.be.equalTo([
            '60px',
            '2rem',
            '1.5em',
            '20px',
            'inherit',
            'small',
            '12px',
        ]);
    });
});
