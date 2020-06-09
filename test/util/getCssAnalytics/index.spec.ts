import chai, { expect } from 'chai';
import assertArrays from 'chai-arrays';
import fs from 'fs';
chai.use(assertArrays);

import { Analytics, Graph, Options } from 'global';

import getCssAnalytics from '../../../src/util/getCssAnalytics/';
import countPropertyValues from '../../../src/util/getCssAnalytics/util/countPropertyValues';
import countUniqueProperties from '../../../src/util/getCssAnalytics/util/countUniqueProperties';
import getAllFontFamilies from '../../../src/util/getCssAnalytics/util/getAllFontFamilies';
import getAllFontSizes from '../../../src/util/getCssAnalytics/util/getAllFontSizes';
import getPropertyResets from '../../../src/util/getCssAnalytics/util/getPropertyResets';
import getRepeatedValues from '../../../src/util/getCssAnalytics/util/getRepeatedValues';
import getSortedSpecificity from '../../../src/util/getCssAnalytics/util/getSortedSpecificity';
import getSpecificityGraph from '../../../src/util/getCssAnalytics/util/getSpecificityGraph';
import getSpecificityValues from '../../../src/util/getCssAnalytics/util/getSpecificityValues';
import getVendorPrefixedProperties from '../../../src/util/getCssAnalytics/util/getVendorPrefixedProperties';

const getStylesheet = (name: string): string => {
    return fs
        .readFileSync(
            './test/util/getCssAnalytics/stylesheets/' + name + '.css',
            'utf8'
        )
        .toString()
        .trim();
};

const generateJSON = (filename: string): void => {
    const css = getStylesheet(filename);
    const analytics = getCssAnalytics(css);
    const outDir = './test/util/getCssAnalytics/results/';
    const outFile = outDir + filename + '.json';
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
    }
    if (fs.existsSync(outFile)) {
        fs.unlinkSync(outFile);
    }
    fs.writeFileSync(
        './test/util/getCssAnalytics/results/' + filename + '.json',
        JSON.stringify(analytics, null, 2)
    );
};

describe('getCssAnalytics', function () {
    // eslint-disable-next-line init-declarations
    let analytics: Analytics;
    const options: Options = {
        importantDeclarations: true,
    };

    before(() => {
        analytics = getCssAnalytics(getStylesheet('small'), options);
    });

    describe('size', () => {
        it('should calculate the correct file size', () => {
            expect(analytics.size).to.equal(885);
        });

        it('should calculate the correct gzip file size', () => {
            expect(analytics.gzipSize).to.equal(367);
        });
    });

    describe('rules', function () {
        it('should count the total number of rules', () => {
            expect(analytics.rules.total).to.equal(12);
        });

        it('should correctly calculate the maximum rule size', () => {
            expect(analytics.rules.size.max).to.equal(4);
        });

        it('should correctly calculate the average rule size', () => {
            expect(analytics.rules.size.average).to.equal(1.8333333333333333);
        });

        it('should return a rule size graph as an array', () => {
            expect(analytics.rules.size.graph).to.be.equalTo([
                1,
                1,
                3,
                1,
                2,
                2,
                1,
                1,
                4,
                4,
                1,
                1,
            ]);
        });

        it('should return selectorsByRuleSizes as an array array', () => {
            expect(analytics.rules.selectorsByRuleSizes).to.deep.equal([
                { selector: '100%', declarations: 4 },
                { selector: '0%', declarations: 4 },
                { selector: '.sm-tomato', declarations: 3 },
                { selector: '.box', declarations: 2 },
                { selector: '.sm-tomato:first-child:last-child', declarations: 2 },
                { selector: '.georgia', declarations: 1 },
                { selector: 'header', declarations: 1 },
                { selector: '.box:last-child', declarations: 1 },
                { selector: '.box:first-child', declarations: 1 },
                { selector: '.sm-tomato::after', declarations: 1 },
                { selector: '.red', declarations: 1 },
                { selector: '.red, #foo', declarations: 1 },
            ]);
        });
    });

    describe('selectors', () => {
        it('should count the total number of selectors', () => {
            expect(analytics.selectors.total).to.equal(11);
        });

        it('should count the total number of id selectors', () => {
            expect(analytics.selectors.id).to.equal(1);
        });

        it('should count the total number of type selectors', () => {
            expect(analytics.selectors.type).to.equal(1);
        });

        it('should count the total number of class selectors', () => {
            expect(analytics.selectors.class).to.equal(9);
        });

        it('should count the total number of pseudo-class selectors', () => {
            expect(analytics.selectors.pseudoClass).to.equal(3);
        });

        it('should  count the total number of pseudo-element selectors', () => {
            expect(analytics.selectors.pseudoElement).to.equal(1);
        });

        it('should return an array of selectors', () => {
            expect(analytics.selectors.values.length > 0).to.equal(true);
        });

        it('should calculate the maximum specificity', () => {
            expect(analytics.selectors.specificity.max).to.equal(100);
        });

        it('should calculate the average specificity', () => {
            expect(analytics.selectors.specificity.average).to.equal(
                21.09090909090909
            );
        });
    });

    describe('declarations', () => {
        it('should count the total number of declarations', () => {
            expect(analytics.declarations.total).to.equal(22);
        });

        it('should count the total number of unique declarations', () => {
            expect(analytics.declarations.unique).to.equal(21);
        });

        it('should count the total number important values', () => {
            expect(analytics.declarations.important.length).to.equal(2);
        });

        it('should return a properties object', () => {
            expect(
                Object.keys(analytics.declarations.properties).length > 0
            ).to.equal(true);
        });
    });

    describe('keyframes', () => {
        // eslint-disable-next-line init-declarations
        let keyFramesAnalytics: Analytics;

        before(() => {
            keyFramesAnalytics = getCssAnalytics(getStylesheet('keyframes'));
        });

        it('should get CSS analytics for style rules in and after a keyframe', () => {
            expect(keyFramesAnalytics.declarations.properties.color.length).to.equal(
                5
            );
        });

        it('should not include @keyframes stops in the selectors list', () => {
            expect(keyFramesAnalytics.selectors.values).to.be.equalTo(['.a', '.b']);
        });
    });

    describe('selector-related functions', () => {
        it('should generate a specificity graph', () => {
            expect(
                (getSpecificityGraph(analytics.selectors.values) as Graph).length > 0
            ).to.equal(true);
        });

        it('should return specificity values for each selector in order', () => {
            expect(
                getSpecificityValues(
                    analytics.selectors.values,
                    getSpecificityGraph(analytics.selectors.values) as Graph
                )
            ).to.deep.equal([
                { selector: '.red', specificity: 10 },
                { selector: '#foo', specificity: 100 },
                { selector: '.red', specificity: 10 },
                { selector: '.sm-tomato', specificity: 10 },
                { selector: '.sm-tomato::after', specificity: 11 },
                { selector: '.sm-tomato:first-child:last-child', specificity: 30 },
                { selector: '.box', specificity: 10 },
                { selector: '.box:first-child', specificity: 20 },
                { selector: '.box:last-child', specificity: 20 },
                { selector: 'header', specificity: 1 },
                { selector: '.georgia', specificity: 10 },
            ]);
        });

        it('should return a sorted specificity array', () => {
            expect(
                getSortedSpecificity(
                    analytics.selectors.values,
                    getSpecificityGraph(analytics.selectors.values) as Graph
                )
            ).to.deep.equal([
                { selector: '#foo', specificity: 100 },
                { selector: '.sm-tomato:first-child:last-child', specificity: 30 },
                { selector: '.box:first-child', specificity: 20 },
                { selector: '.box:last-child', specificity: 20 },
                { selector: '.sm-tomato::after', specificity: 11 },
                { selector: '.red', specificity: 10 },
                { selector: '.box', specificity: 10 },
                { selector: '.sm-tomato', specificity: 10 },
                { selector: '.red', specificity: 10 },
                { selector: '.georgia', specificity: 10 },
                { selector: 'header', specificity: 1 },
            ]);
        });

        it('should return repeated selectors', () => {
            expect(getRepeatedValues(analytics.selectors.values)).to.be.equalTo([
                '.red',
            ]);
        });
    });

    describe('declaration-related functions', () => {
        it('should count the total number of declarations that reset properties', () => {
            expect(
                getPropertyResets(analytics.declarations.properties)
            ).to.deep.equal({
                margin: 1,
                padding: 1,
                'margin-bottom': 1,
            });
        });

        it('should count the total number of unique colors', () => {
            expect(
                countUniqueProperties(analytics.declarations.properties, 'color')
            ).to.equal(2);
        });

        it('should count the total number of color: red', () => {
            expect(
                countPropertyValues(
                    analytics.declarations.properties,
                    'color',
                    'red'
                )
            ).to.equal(2);
        });

        it('should count the total number of vendor prefixes', () => {
            expect(
                getVendorPrefixedProperties(analytics.declarations.properties).length
            ).to.equal(5);
        });

        it('should get all font sizes', () => {
            expect(
                (getAllFontSizes(analytics.declarations.properties) as string[])
                    .length
            ).to.equal(1);
        });

        it('should get all font families', () => {
            expect(
                (getAllFontFamilies(analytics.declarations.properties) as string[])
                    .length
            ).to.equal(1);
        });
    });

    it('should be able to parse css and produce stats', done => {
        [
            'basscss',
            'small',
            'font-awesome',
            'gridio',
            'gridio-national-light',
        ].forEach(stylesheet => generateJSON(stylesheet));
        done();
    });
});

describe('analytics with no media queries', () => {
    // eslint-disable-next-line init-declarations
    let analytics: Analytics;

    before(() => {
        analytics = getCssAnalytics(getStylesheet('small'), { mediaQueries: false });
    });

    it('should not contain media query contents', () => {
        expect(analytics.mediaQueries.contents).to.equal(undefined);
    });
});
