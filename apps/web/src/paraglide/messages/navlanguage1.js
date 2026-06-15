/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navlanguage1Inputs */

const en_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

const es_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Idioma`)
};

const zh_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言`)
};

/**
* | output |
* | --- |
* | "Language" |
*
* @param {Navlanguage1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navlanguage1 = /** @type {((inputs?: Navlanguage1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navlanguage1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navlanguage1(inputs)
	if (locale === "es") return es_navlanguage1(inputs)
	return zh_navlanguage1(inputs)
});
export { navlanguage1 as "navLanguage" }