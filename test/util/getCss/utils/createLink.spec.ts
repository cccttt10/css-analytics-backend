import { expect } from 'chai';

import createLink from '../../../../src/util/getCss/util/createLink';

describe('createLink', () => {
    it('should create the correct link object', () => {
        expect(
            createLink('../bar.css', 'http://foo.com/css/my-css.css')
        ).to.deep.equal({
            link: '../bar.css',
            url: 'http://foo.com/bar.css',
            css: '',
        });
    });

    it('should correctly resolve full url links', () => {
        expect(
            createLink('http://foo.com/bar.css', 'http://foo.com/css/my-css.css')
        ).to.deep.equal({
            link: 'http://foo.com/bar.css',
            url: 'http://foo.com/bar.css',
            css: '',
        });
    });
});
