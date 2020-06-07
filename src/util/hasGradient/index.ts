export const gradientReg = /(linear-gradient|radial-gradient)\(.*\)/;

const hasGradient = (property: string): boolean => {
    if (typeof property !== 'string') {
        throw new TypeError('hasGradient expects (property: string)');
    }
    return gradientReg.test(property);
};

export default hasGradient;
