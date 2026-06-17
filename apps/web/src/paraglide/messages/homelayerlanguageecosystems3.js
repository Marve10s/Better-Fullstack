/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerlanguageecosystems3Inputs */

const en_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`LANGUAGE ECOSYSTEMS`)
};

const es_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ECOSISTEMAS DE LENGUAJE`)
};

const zh_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言生态`)
};

const ja_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`言語エコシステム`)
};

const ko_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`언어 생태계`)
};

const zh_hant1_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`語言生態`)
};

const de_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SPRACHÖKOSYSTEME`)
};

const fr_homelayerlanguageecosystems3 = /** @type {(inputs: Homelayerlanguageecosystems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ÉCOSYSTÈMES LINGUISTIQUES`)
};

/**
* | output |
* | --- |
* | "LANGUAGE ECOSYSTEMS" |
*
* @param {Homelayerlanguageecosystems3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelayerlanguageecosystems3 = /** @type {((inputs?: Homelayerlanguageecosystems3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerlanguageecosystems3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerlanguageecosystems3(inputs)
	if (locale === "es") return es_homelayerlanguageecosystems3(inputs)
	if (locale === "zh") return zh_homelayerlanguageecosystems3(inputs)
	if (locale === "ja") return ja_homelayerlanguageecosystems3(inputs)
	if (locale === "ko") return ko_homelayerlanguageecosystems3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayerlanguageecosystems3(inputs)
	if (locale === "de") return de_homelayerlanguageecosystems3(inputs)
	return fr_homelayerlanguageecosystems3(inputs)
});
export { homelayerlanguageecosystems3 as "homeLayerLanguageEcosystems" }