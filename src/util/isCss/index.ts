import path from 'path';

const isCss = (cssFilePath: string): boolean => {
    if (typeof cssFilePath !== 'string') {
        throw new TypeError('isCss expects (cssFilePath: string)');
    }
    return /^\.css$/i.test(path.extname(cssFilePath));
};

export default isCss;
