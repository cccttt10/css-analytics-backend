import isBlank from 'is-blank';
import isPresent from 'is-present';
import specificity from 'specificity';

const getSpecificityGraph = (selectors: string[]): number[] | false => {
    if (isBlank(selectors)) {
        return false;
    }
    const graph = (selector: string): number => {
        return specificity
            .calculate(selector)[0]
            .specificity.split(',')
            .map((n: string) => parseFloat(n))
            .reverse()
            .reduce((a: number, b: number, i: number) => {
                b = b < 10 ? b : 9;
                return a + b * Math.pow(10, i);
            });
    };
    return selectors.filter(isPresent).map(graph);
};

export default getSpecificityGraph;
