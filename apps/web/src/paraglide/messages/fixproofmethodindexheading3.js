/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodindexheading3Inputs */

const en_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The two indexes`)
};

const es_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los dos índices`)
};

const zh_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`两个指数`)
};

const ja_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2 つの指数`)
};

const ko_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`두 지수`)
};

const zh_hant1_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`兩個指數`)
};

const de_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die beiden Indizes`)
};

const fr_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les deux indices`)
};

const uk_fixproofmethodindexheading3 = /** @type {(inputs: Fixproofmethodindexheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Два індекси`)
};

/**
* | output |
* | --- |
* | "The two indexes" |
*
* @param {Fixproofmethodindexheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodindexheading3 = /** @type {((inputs?: Fixproofmethodindexheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodindexheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodindexheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodindexheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodindexheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodindexheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodindexheading3(inputs)
	if (locale === "de") return de_fixproofmethodindexheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodindexheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodindexheading3(inputs)
	return en_fixproofmethodindexheading3(inputs)
});
export { fixproofmethodindexheading3 as "fixproofMethodIndexHeading" }