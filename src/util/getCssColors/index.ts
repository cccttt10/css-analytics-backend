import cssColorList from 'css-color-list';
import hslRegex from 'hsl-regex';
import hslaRegex from 'hsla-regex';
import rgbRegex from 'rgb-regex';
import rgbaRegex from 'rgba-regex';

const getCssColors = (str: string): string[] => {
    if (typeof str !== 'string') {
        throw new TypeError('getCssColors expects (str: string)');
    }
    const colorListRegex = cssColorList().join('|');
    const rgbOrRgbaRegex = rgbRegex().source + '|' + rgbaRegex().source;
    const hslOrHslaRegex = hslRegex().source + '|' + hslaRegex().source;
    const hexRegex = '#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\\b';
    const cssColorRegex = new RegExp(
        colorListRegex +
            '|' +
            rgbOrRgbaRegex +
            '|' +
            hslOrHslaRegex +
            '|' +
            hexRegex,
        'ig'
    );
    return str.match(cssColorRegex);
};

export default getCssColors;
