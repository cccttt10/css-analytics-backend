const size = (str: string): number => Buffer.byteLength(str, 'utf8');

export default size;
