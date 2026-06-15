/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Guidesrelated1Inputs */

const en_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Related guides`)
};

const es_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías relacionadas`)
};

const zh_guidesrelated1 = /** @type {(inputs: Guidesrelated1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`相关指南`)
};

/**
* | output |
* | --- |
* | "Related guides" |
*
* @param {Guidesrelated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const guidesrelated1 = /** @type {((inputs?: Guidesrelated1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesrelated1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_guidesrelated1(inputs)
	if (locale === "es") return es_guidesrelated1(inputs)
	return zh_guidesrelated1(inputs)
});
export { guidesrelated1 as "guidesRelated" }