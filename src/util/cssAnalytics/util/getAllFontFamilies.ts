import shorthandExpand from 'css-shorthand-expand';
import { Properties } from 'global';

const getAllFontFamilies = (properties: Properties): string[] | 0 => {
    if (!properties) {
        return 0;
    }
    let families: string[] = properties['font-family'] || [];
    if (properties.font) {
        families = families.concat(
            properties.font
                .map((value: string) => {
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
    return families;
};

export default getAllFontFamilies;
