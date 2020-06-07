import pseudoElements from 'pseudo-elements';

const hasPseudoElement = (selector: string): boolean => {
    if (typeof selector !== 'string') {
        throw new TypeError('hasPseudoElement expects (selector: string)');
    }

    const pseudoElementReg = new RegExp('::?' + pseudoElements().join('|::?'), 'ig');
    return pseudoElementReg.test(selector);
};

export default hasPseudoElement;
