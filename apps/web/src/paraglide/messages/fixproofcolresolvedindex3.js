/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolresolvedindex3Inputs */

const en_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved index`)
};

const es_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Índice Resolved`)
};

const zh_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 指数`)
};

const ja_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 指数`)
};

const ko_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 지수`)
};

const zh_hant1_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 指數`)
};

const de_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved-Index`)
};

const fr_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Indice Resolved`)
};

const uk_fixproofcolresolvedindex3 = /** @type {(inputs: Fixproofcolresolvedindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Індекс Resolved`)
};

/**
* | output |
* | --- |
* | "Resolved index" |
*
* @param {Fixproofcolresolvedindex3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolresolvedindex3 = /** @type {((inputs?: Fixproofcolresolvedindex3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolresolvedindex3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolresolvedindex3(inputs)
	if (locale === "zh") return zh_fixproofcolresolvedindex3(inputs)
	if (locale === "ja") return ja_fixproofcolresolvedindex3(inputs)
	if (locale === "ko") return ko_fixproofcolresolvedindex3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolresolvedindex3(inputs)
	if (locale === "de") return de_fixproofcolresolvedindex3(inputs)
	if (locale === "fr") return fr_fixproofcolresolvedindex3(inputs)
	if (locale === "uk") return uk_fixproofcolresolvedindex3(inputs)
	return en_fixproofcolresolvedindex3(inputs)
});
export { fixproofcolresolvedindex3 as "fixproofColResolvedIndex" }