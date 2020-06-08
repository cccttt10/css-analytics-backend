import { expect } from 'chai';

import hasGradient from '../../src/util/hasGradient';

const gradients: string[] = [
    'linear-gradient(white, tomato)',
    'radial-gradient(hotpink, rebeccapurple)',
    'linear-gradient(blue, rgba(0, 0, 0, .4)',
];

const nonGradients: string[] = ['red', 'url(/my/img.png)'];

describe('hasGradient', () => {
    it('should return true for gradients', () => {
        for (const gradient of gradients) {
            expect(hasGradient(gradient)).to.equal(true);
        }
    });

    it('should return false for nonGradients', () => {
        for (const nonGradient of nonGradients) {
            expect(hasGradient(nonGradient)).to.equal(false);
        }
    });
});
