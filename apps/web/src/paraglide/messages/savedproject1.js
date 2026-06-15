/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedproject1Inputs */

const en_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const es_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyecto`)
};

const zh_savedproject1 = /** @type {(inputs: Savedproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目`)
};

/**
* | output |
* | --- |
* | "Project" |
*
* @param {Savedproject1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedproject1 = /** @type {((inputs?: Savedproject1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedproject1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedproject1(inputs)
	if (locale === "es") return es_savedproject1(inputs)
	return zh_savedproject1(inputs)
});
export { savedproject1 as "savedProject" }