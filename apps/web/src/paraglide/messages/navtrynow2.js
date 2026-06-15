/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navtrynow2Inputs */

const en_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try now`)
};

const es_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probar ahora`)
};

const zh_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`立即试用`)
};

/**
* | output |
* | --- |
* | "Try now" |
*
* @param {Navtrynow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navtrynow2 = /** @type {((inputs?: Navtrynow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navtrynow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navtrynow2(inputs)
	if (locale === "es") return es_navtrynow2(inputs)
	return zh_navtrynow2(inputs)
});
export { navtrynow2 as "navTryNow" }