/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometotal1Inputs */

const en_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`total`)
};

const es_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`total`)
};

const zh_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总计`)
};

/**
* | output |
* | --- |
* | "total" |
*
* @param {Hometotal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometotal1 = /** @type {((inputs?: Hometotal1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotal1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotal1(inputs)
	if (locale === "es") return es_hometotal1(inputs)
	return zh_hometotal1(inputs)
});
export { hometotal1 as "homeTotal" }