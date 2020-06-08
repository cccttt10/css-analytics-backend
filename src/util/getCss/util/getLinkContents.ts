import q from 'q';
import query from 'query-string';
import request from 'request';

const getLinkContents = (
    linkUrl: string,
    options: { timeout: number }
): q.Promise<unknown> => {
    const d = q.defer();
    const { url } = query.parseUrl(linkUrl);

    if (!/\.css$/i.test(url)) {
        d.resolve('');
        return d.promise;
    }

    request(
        { url: linkUrl, timeout: options.timeout, gzip: true },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                d.reject(error);
            }
            d.resolve(body);
        }
    );

    return d.promise;
};

export default getLinkContents;
