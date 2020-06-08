/* eslint-disable no-console */
import fs from 'fs';
import { Link } from 'global';

import getCss from '../../../src/util/getCss/index.js';

const results: Array<{
    pageTitle: string;
    styles: string[];
    links: Link[];
}> = [];

const writeLog = (): void => {
    fs.writeFileSync(
        './test/util/getCss/results.json',
        JSON.stringify(results, null, 2)
    );
};

const logResults = (response: {
    pageTitle: string;
    styles: string[];
    links: Link[];
}): void => {
    results.push(response);
    console.log('Results from: ', response.pageTitle);
    console.log(response.styles.length + ' Style Tags');
    console.log(response.links.length + ' Stylesheets');
    response.links.forEach(link => console.log(link.url));
    writeLog();
};

getCss('http://google.com')
    .then(logResults)
    .catch((err: Error) => console.error(err));

getCss('http://amazon.com')
    .then(logResults)
    .catch((err: Error) => console.error(err));

getCss('http://twitter.com/jxnblk')
    .then(logResults)
    .catch((err: Error) => console.error(err));

getCss('http://facebook.com')
    .then(logResults)
    .catch((err: Error) => console.error(err));

getCss('http://johnotander.com/public/css/c.min.css')
    .then(logResults)
    .catch((err: Error) => console.error(err));
