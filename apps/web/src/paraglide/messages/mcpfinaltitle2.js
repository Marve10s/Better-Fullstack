/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitle2Inputs */

const en_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6× faster than`)
};

const es_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6× más rápido que`)
};

const zh_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比`)
};

/**
* | output |
* | --- |
* | "2.6× faster than" |
*
* @param {Mcpfinaltitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitle2 = /** @type {((inputs?: Mcpfinaltitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaltitle2(inputs)
	if (locale === "es") return es_mcpfinaltitle2(inputs)
	return zh_mcpfinaltitle2(inputs)
});
export { mcpfinaltitle2 as "mcpFinalTitle" }