/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navguides1Inputs */

const en_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guides`)
};

const es_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías`)
};

const zh_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指南`)
};

/**
* | output |
* | --- |
* | "Guides" |
*
* @param {Navguides1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navguides1 = /** @type {((inputs?: Navguides1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navguides1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navguides1(inputs)
	if (locale === "es") return es_navguides1(inputs)
	return zh_navguides1(inputs)
});
export { navguides1 as "navGuides" }