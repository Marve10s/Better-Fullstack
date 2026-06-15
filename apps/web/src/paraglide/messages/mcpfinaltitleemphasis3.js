/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitleemphasis3Inputs */

const en_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt-only.`)
};

const es_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`solo prompt.`)
};

const zh_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`纯 prompt 快 2.6×。`)
};

/**
* | output |
* | --- |
* | "prompt-only." |
*
* @param {Mcpfinaltitleemphasis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitleemphasis3 = /** @type {((inputs?: Mcpfinaltitleemphasis3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitleemphasis3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaltitleemphasis3(inputs)
	if (locale === "es") return es_mcpfinaltitleemphasis3(inputs)
	return zh_mcpfinaltitleemphasis3(inputs)
});
export { mcpfinaltitleemphasis3 as "mcpFinalTitleEmphasis" }