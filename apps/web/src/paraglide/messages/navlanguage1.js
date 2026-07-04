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

const ja_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`言語`)
};

const ko_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`언어`)
};

const zh_hant1_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`語言`)
};

const de_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sprache`)
};

const fr_navlanguage1 = /** @type {(inputs: Navlanguage1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Langue`)
};

/**
* | output |
* | --- |
* | "Language" |
*
* @param {Navlanguage1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navlanguage1 = /** @type {((inputs?: Navlanguage1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navlanguage1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navlanguage1(inputs)
	if (locale === "es") return es_navlanguage1(inputs)
	if (locale === "zh") return zh_navlanguage1(inputs)
	if (locale === "ja") return ja_navlanguage1(inputs)
	if (locale === "ko") return ko_navlanguage1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navlanguage1(inputs)
	if (locale === "de") return de_navlanguage1(inputs)
	return fr_navlanguage1(inputs)
});
export { navlanguage1 as "navLanguage" }