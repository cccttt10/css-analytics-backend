import shorthandExpand from 'css-shorthand-expand';
import { Properties } from 'global';

const getAllFontSizes = (properties: Properties): string[] | 0 => {
    if (!properties) {
        return 0;
    }
    let fontSizes: string[] = properties['font-size'] || [];
    if (properties.font) {
        fontSizes = fontSizes.concat(
            properties.font
                .map(value => {
                    try {
                        return shorthandExpand('font', value)['font-family'];
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.log('Error in css-shorthand-expand');
                        // eslint-disable-next-line no-console
                        console.log(err);
                    }
                })
                .filter(value => value)
        );
    }
    return fontSizes;
};

export default getAllFontSizes;
