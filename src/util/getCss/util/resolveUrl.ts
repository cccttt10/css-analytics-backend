import url from 'url';
const urlResolver = url.resolve;

const endsInForwardSlash = (url: string): boolean => {
    return url.indexOf('/', url.length - 1) !== -1;
};

const isCssFile = (url: string): boolean => {
    return url.indexOf('.css', url.length - 4) !== -1;
};

const isHtmlUrl = (url: string): boolean => {
    return url.indexOf('.html', url.length - 5) !== -1;
};

// TODO: return type?
const removeExtension = (url: string): string => {
    return url.replace(/\.[^/.]+$/, '');
};

const resolveUrl = (url: string, link: string): string => {
    if (link.match(/^(http|https)/g)) {
        return link;
    } else {
        if (isCssFile(url)) {
            url = removeExtension(url);
        } else if (!endsInForwardSlash(url)) {
            if (!isHtmlUrl(url)) {
                url += '/';
            }
        }
        return urlResolver(url, link);
    }
};

export default resolveUrl;
