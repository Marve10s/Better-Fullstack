/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodexcludedheading3Inputs */

const en_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What is excluded`)
};

const es_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Qué queda excluido`)
};

const zh_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`哪些会被排除`)
};

const ja_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`除外するもの`)
};

const ko_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제외하는 것`)
};

const zh_hant1_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`哪些會被排除`)
};

const de_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Was ausgeschlossen wird`)
};

const fr_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ce qui est exclu`)
};

const uk_fixproofmethodexcludedheading3 = /** @type {(inputs: Fixproofmethodexcludedheading3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Що виключено`)
};

/**
* | output |
* | --- |
* | "What is excluded" |
*
* @param {Fixproofmethodexcludedheading3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodexcludedheading3 = /** @type {((inputs?: Fixproofmethodexcludedheading3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodexcludedheading3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodexcludedheading3(inputs)
	if (locale === "zh") return zh_fixproofmethodexcludedheading3(inputs)
	if (locale === "ja") return ja_fixproofmethodexcludedheading3(inputs)
	if (locale === "ko") return ko_fixproofmethodexcludedheading3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodexcludedheading3(inputs)
	if (locale === "de") return de_fixproofmethodexcludedheading3(inputs)
	if (locale === "fr") return fr_fixproofmethodexcludedheading3(inputs)
	if (locale === "uk") return uk_fixproofmethodexcludedheading3(inputs)
	return en_fixproofmethodexcludedheading3(inputs)
});
export { fixproofmethodexcludedheading3 as "fixproofMethodExcludedHeading" }