import { Graph, Options, Selectors } from 'global';
import _ from 'lodash';
import postcss from 'postcss';

import hasClassSelector from '../../hasClassSelector';
import hasElementSelector from '../../hasElementSelector';
import hasIdSelector from '../../hasIdSelector';
import hasPseudoClass from '../../hasPseudoClass';
import hasPseudoElement from '../../hasPseudoElement';
import getRepeatedValues from './getRepeatedValues';
import getSortedSpecificity from './getSortedSpecificity';
import getSpecificityGraph from './getSpecificityGraph';

const getSelectors = (root: postcss.Root, opts?: Options): Selectors => {
    const result: Selectors = {
        total: 0,
        type: 0,
        class: 0,
        id: 0,
        pseudoClass: 0,
        pseudoElement: 0,
        values: [],
        specificity: {
            max: 0,
            average: 0,
        },
    };
    root.walkRules(rule => {
        const parent = rule.parent;
        if (parent.type === 'atrule' && parent.name === 'keyframes') {
            return;
        }
        rule.selectors.forEach(selector => {
            result.total++;
            result.values.push(selector);
            if (hasElementSelector(selector)) {
                result.type++;
            }
            if (hasClassSelector(selector)) {
                result.class++;
            }
            if (hasIdSelector(selector)) {
                result.id++;
            }
            if (hasPseudoElement(selector)) {
                result.pseudoElement++;
            }
            if (hasPseudoClass(selector)) {
                result.pseudoClass++;
            }
        });
    });
    const graph: Graph = getSpecificityGraph(result.values) as Graph;
    result.specificity.max = _.max(graph) || 0;
    result.specificity.average = _.sum(graph) / graph.length || 0;
    if (opts.specificityGraph) {
        result.specificity.graph = graph;
    }
    if (opts.sortedSpecificityGraph) {
        result.specificity.sortedGraph = getSortedSpecificity(result.values, graph);
    }
    if (opts.repeatedSelectors) {
        result.repeated = getRepeatedValues(result.values);
    }
    return result;
};

export default getSelectors;
