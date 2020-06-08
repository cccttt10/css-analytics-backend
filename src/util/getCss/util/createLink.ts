import { Link } from 'global';

import resolveUrl from './resolveUrl';

const createLink = (link: string, url: string): Link => {
    return {
        link: link,
        url: resolveUrl(url, link),
        css: '',
    };
};

export default createLink;
