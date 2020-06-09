import { Rules } from 'global';
import _ from 'lodash';
import postcss from 'postcss';

const getRules = (root: postcss.Root): Rules => {
    const result: Rules = {
        total: 0,
        size: {
            graph: [],
            max: 0,
            average: 0,
        },
        selectorsByRuleSizes: [],
    };

    root.walkRules(function (rule) {
        const selector: string = rule.selector;
        let numDeclarations = 0;
        for (const node of rule.nodes) {
            if (node.type === 'decl') {
                numDeclarations = numDeclarations + 1;
            }
        }
        result.total = result.total + 1;
        result.size.graph.push(numDeclarations);
        result.selectorsByRuleSizes.push({
            selector: selector,
            declarations: numDeclarations,
        });
    });

    result.selectorsByRuleSizes = _.sortBy(
        result.selectorsByRuleSizes,
        'declarations'
    ).reverse();

    if (result.total > 0) {
        result.size.max = _.max(result.size.graph);
        result.size.average = _.sum(result.size.graph) / result.size.graph.length;
    }

    return result;
};

export default getRules;
