/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagepickerlabel3Inputs */

const en_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

const es_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lenguaje`)
};

const zh_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言`)
};

const ja_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`言語`)
};

const ko_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`언어`)
};

const zh_hant1_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`語言`)
};

const de_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sprache`)
};

const fr_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Langage`)
};

const uk_builderlanguagepickerlabel3 = /** @type {(inputs: Builderlanguagepickerlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мова`)
};

/**
* | output |
* | --- |
* | "Language" |
*
* @param {Builderlanguagepickerlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagepickerlabel3 = /** @type {((inputs?: Builderlanguagepickerlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagepickerlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlanguagepickerlabel3(inputs)
	if (locale === "zh") return zh_builderlanguagepickerlabel3(inputs)
	if (locale === "ja") return ja_builderlanguagepickerlabel3(inputs)
	if (locale === "ko") return ko_builderlanguagepickerlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlanguagepickerlabel3(inputs)
	if (locale === "de") return de_builderlanguagepickerlabel3(inputs)
	if (locale === "fr") return fr_builderlanguagepickerlabel3(inputs)
	if (locale === "uk") return uk_builderlanguagepickerlabel3(inputs)
	return en_builderlanguagepickerlabel3(inputs)
});
export { builderlanguagepickerlabel3 as "builderLanguagePickerLabel" }