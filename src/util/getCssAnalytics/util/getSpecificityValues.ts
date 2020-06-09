import _ from 'lodash';

const getSpecificityValues = (
    selectors: string[],
    graph: number[]
): Array<{ selector: string; specificity: number }> => {
    return _.zipWith(selectors, graph, (selector: string, specificity: number) => {
        return {
            selector: selector,
            specificity: specificity,
        };
    });
};

export default getSpecificityValues;
