/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpheroeyebrow2Inputs */

const en_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent integration`)
};

const es_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`integración de agentes`)
};

const zh_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理集成`)
};

/**
* | output |
* | --- |
* | "agent integration" |
*
* @param {Mcpheroeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpheroeyebrow2 = /** @type {((inputs?: Mcpheroeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpheroeyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpheroeyebrow2(inputs)
	if (locale === "es") return es_mcpheroeyebrow2(inputs)
	return zh_mcpheroeyebrow2(inputs)
});
export { mcpheroeyebrow2 as "mcpHeroEyebrow" }