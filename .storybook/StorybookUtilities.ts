/**
 * Generates a function that will wrap a string in a markdown code fence for `filetype`
 * @param filetype Type to be added to the fence.
 */
export const fence = (filetype: string) => (content: string) =>
	'```' + filetype + '\n' + content + '\n' + '```';

/**
 * Function that will wrap any string in a markdown code fence for HTML
 */
export const htmlFence = fence('html');

/**
 * Function that will wrap any string in a markdown code fence for TypeScript.
 */
export const tsFence = fence('typescript');
