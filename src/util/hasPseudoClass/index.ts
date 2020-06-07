import pseudoClasses from 'pseudo-classes';

const hasPseudoClass = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasPseudoClass expects (selector: string)');
    }
    const pseudoClassReg = new RegExp(':' + pseudoClasses().join('|:'), 'ig');
    return pseudoClassReg.test(selector);
};

export default hasPseudoClass;
