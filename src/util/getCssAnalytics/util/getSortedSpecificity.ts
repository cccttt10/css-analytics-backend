import _ from 'lodash';

const getSortedSpecificity = (
    selectors: string[],
    graph: number[]
): Array<{ selector: string; specificity: number }> => {
    return _.zipWith(selectors, graph, (selector: string, specificity: number) => {
        return { selector: selector, specificity: specificity };
    }).sort((a, b) => b.specificity - a.specificity);
};

export default getSortedSpecificity;
