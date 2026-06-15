/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparefeature1Inputs */

const en_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feature`)
};

const es_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Función`)
};

const zh_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能`)
};

/**
* | output |
* | --- |
* | "Feature" |
*
* @param {Comparefeature1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparefeature1 = /** @type {((inputs?: Comparefeature1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparefeature1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparefeature1(inputs)
	if (locale === "es") return es_comparefeature1(inputs)
	return zh_comparefeature1(inputs)
});
export { comparefeature1 as "compareFeature" }