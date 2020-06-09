import beautify from 'cssbeautify';
import { Request, Response } from 'express';
import getQueryParam from 'get-query-param';
import normalizeUrl from 'normalize-url';

import getCss from '../../util/getCss/';
import cssAnalytics from '../../util/getCssAnalytics/';
import { isValidUrl, stdout } from '../util';

const getCssAnalytics = async (req: Request, res: Response): Promise<void> => {
    const url: string = getQueryParam('url', req.url);
    const normalizedUrl: string = url && normalizeUrl(url);
    if (!isValidUrl(normalizedUrl)) {
        res.status(400).send('invalid url');
    }
    try {
        const css = await getCss(normalizedUrl);
        const analytics = cssAnalytics(css.css, {
            specificityGraph: true,
            repeatedSelectors: true,
            propertyResets: true,
        });
        css.css = beautify(css.css);
        res.status(200).send({ analytics, css });
    } catch (e) {
        stdout.error(e);
        res.status(500).send('Some thing went wrong');
    }
};

export default getCssAnalytics;
