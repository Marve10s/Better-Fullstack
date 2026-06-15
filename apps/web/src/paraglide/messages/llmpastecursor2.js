/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpastecursor2Inputs */

const en_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`paste into ~/.cursor/mcp.json under mcpServers`)
};

const es_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`pega en ~/.cursor/mcp.json dentro de mcpServers`)
};

const zh_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`粘贴到 ~/.cursor/mcp.json 的 mcpServers 中`)
};

/**
* | output |
* | --- |
* | "paste into ~/.cursor/mcp.json under mcpServers" |
*
* @param {Llmpastecursor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpastecursor2 = /** @type {((inputs?: Llmpastecursor2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpastecursor2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpastecursor2(inputs)
	if (locale === "es") return es_llmpastecursor2(inputs)
	return zh_llmpastecursor2(inputs)
});
export { llmpastecursor2 as "llmPasteCursor" }