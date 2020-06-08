/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import cheerio from 'cheerio';
import isBlank from 'is-blank';
import isPresent from 'is-present';
import isUrl from 'is-url-superb';
import normalizeUrl from 'normalize-url';
import q from 'q';
import request from 'requestretry';
import stripHtmlComments from 'strip-html-comments';
import stripWaybackToolbar from 'strip-wayback-toolbar';
import ua from 'ua-string';

import isCss from '../isCss';
import resolveCssImportUrls from '../resolveCssImportUrls';
import createLink from './util/createLink';
import getLinkContents from './util/getLinkContents';

function getCss(url, options, html) {
    const deferred = q.defer();
    options = options || {};
    options.headers = options.headers || {};
    options.headers['User-Agent'] = options.headers['User-Agent'] || ua;
    options.timeout = options.timeout || 5000;
    options.stripWayback = options.stripWayback || false;
    options.gzip = true;

    if (typeof url !== 'string' || isBlank(url) || !isUrl(url)) {
        throw new TypeError('get-css expected a url as a string');
    }

    url = normalizeUrl(url, { stripWWW: false });
    options.url = url;

    if (options.ignoreCerts) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const status = {
        parsed: 0,
        total: 0,
    };

    const result = {
        links: [],
        styles: [],
        css: '',
    };

    function handleResolve() {
        if (status.parsed >= status.total) {
            deferred.resolve(result);
        }
    }

    function parseHtml(html) {
        if (options.stripWayback) {
            html = stripWaybackToolbar(html);
        }
        const $ = cheerio.load(html);
        result.pageTitle = $('head > title').text();
        result.html = html;

        $('[rel=stylesheet]').each(function () {
            const link = $(this).attr('href');
            if (isPresent(link)) {
                result.links.push(createLink(link, url));
            } else {
                result.styles.push(stripHtmlComments($(this).html()));
            }
        });

        $('style').each(function () {
            result.styles.push(stripHtmlComments($(this).html()));
        });

        status.total = result.links.length + result.styles.length;
        if (!status.total) {
            handleResolve();
        }

        result.links.forEach(function (link) {
            getLinkContents(link.url, options)
                .then(function (css) {
                    handleCssFromLink(link, css);
                })
                .catch(function (error) {
                    link.error = error;
                    status.parsed++;
                    handleResolve();
                });
        });

        result.styles.forEach(function (css) {
            result.css += css;
            status.parsed++;
            handleResolve();
        });
    }

    function handleCssFromLink(link, css) {
        link.css += css;

        parseCssForImports(link, css);

        status.parsed++;
        handleResolve();
    }

    // Handle potential @import url(foo.css) statements in the CSS.
    function parseCssForImports(link, css) {
        link.imports = resolveCssImportUrls(link.url, css);
        status.total += link.imports.length;
        result.css += css;

        link.imports.forEach(function (importUrl) {
            const importLink = createLink(importUrl, importUrl);
            result.links.push(importLink);

            getLinkContents(importLink.url, options)
                .then(function (css) {
                    handleCssFromLink(importLink, css);
                })
                .catch(function (error) {
                    link.error = error;
                    status.parsed++;
                    handleResolve();
                });
        });
    }

    function handleBody(body) {
        if (isCss(url)) {
            const link = createLink(url, url);
            result.links.push(link);
            handleCssFromLink(link, body);
        } else {
            parseHtml(body);
        }
    }

    if (html) {
        handleBody(html);
    } else {
        request(options, function (error, response, body) {
            if (error) {
                if (options.verbose) console.log('Error from ' + url + ' ' + error);
                deferred.reject(error);
                return;
            }

            if (response && response.statusCode !== 200) {
                if (options.verbose)
                    console.log(
                        'Received a ' + response.statusCode + ' from: ' + url
                    );
                deferred.reject({ url: url, statusCode: response.code });
                return;
            }

            handleBody(body);
        });
    }

    return deferred.promise;
}

export default getCss;
