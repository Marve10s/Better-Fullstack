/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaleyebrow2Inputs */

const en_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`benchmark-backed`)
};

const es_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`respaldado por benchmark`)
};

const zh_mcpfinaleyebrow2 = /** @type {(inputs: Mcpfinaleyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由 benchmark 支撑`)
};

/**
* | output |
* | --- |
* | "benchmark-backed" |
*
* @param {Mcpfinaleyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpfinaleyebrow2 = /** @type {((inputs?: Mcpfinaleyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaleyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaleyebrow2(inputs)
	if (locale === "es") return es_mcpfinaleyebrow2(inputs)
	return zh_mcpfinaleyebrow2(inputs)
});
export { mcpfinaleyebrow2 as "mcpFinalEyebrow" }