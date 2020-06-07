/* eslint-disable init-declarations */
declare module 'css-shorthand-expand' {
    const shorthandExpand: (
        property: 'font',
        value: string
    ) => { 'font-family': string };
    export default shorthandExpand;
}
