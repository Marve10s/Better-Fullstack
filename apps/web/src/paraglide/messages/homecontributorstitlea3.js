/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitlea3Inputs */

const en_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Built in public.`)
};

const es_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construido en público.`)
};

const zh_homecontributorstitlea3 = /** @type {(inputs: Homecontributorstitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开构建。`)
};

/**
* | output |
* | --- |
* | "Built in public." |
*
* @param {Homecontributorstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecontributorstitlea3 = /** @type {((inputs?: Homecontributorstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitlea3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorstitlea3(inputs)
	if (locale === "es") return es_homecontributorstitlea3(inputs)
	return zh_homecontributorstitlea3(inputs)
});
export { homecontributorstitlea3 as "homeContributorsTitleA" }