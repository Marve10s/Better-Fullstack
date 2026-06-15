/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipsetecosystemfirst4Inputs */

const en_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set ecosystem first: it decides which fields matter`)
};

const es_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Define primero el ecosistema: decide qué campos importan`)
};

const zh_mcptipsetecosystemfirst4 = /** @type {(inputs: Mcptipsetecosystemfirst4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先设置生态：它会决定哪些字段有效`)
};

/**
* | output |
* | --- |
* | "Set ecosystem first: it decides which fields matter" |
*
* @param {Mcptipsetecosystemfirst4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptipsetecosystemfirst4 = /** @type {((inputs?: Mcptipsetecosystemfirst4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipsetecosystemfirst4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipsetecosystemfirst4(inputs)
	if (locale === "es") return es_mcptipsetecosystemfirst4(inputs)
	return zh_mcptipsetecosystemfirst4(inputs)
});
export { mcptipsetecosystemfirst4 as "mcpTipSetEcosystemFirst" }