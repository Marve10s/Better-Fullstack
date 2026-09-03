/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomeexcluded2Inputs */

const en_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Excluded`)
};

const es_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Excluida`)
};

const zh_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已排除`)
};

const ja_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`除外`)
};

const ko_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제외`)
};

const zh_hant1_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已排除`)
};

const de_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ausgeschlossen`)
};

const fr_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exclue`)
};

const uk_fixproofoutcomeexcluded2 = /** @type {(inputs: Fixproofoutcomeexcluded2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Виключено`)
};

/**
* | output |
* | --- |
* | "Excluded" |
*
* @param {Fixproofoutcomeexcluded2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomeexcluded2 = /** @type {((inputs?: Fixproofoutcomeexcluded2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomeexcluded2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomeexcluded2(inputs)
	if (locale === "zh") return zh_fixproofoutcomeexcluded2(inputs)
	if (locale === "ja") return ja_fixproofoutcomeexcluded2(inputs)
	if (locale === "ko") return ko_fixproofoutcomeexcluded2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomeexcluded2(inputs)
	if (locale === "de") return de_fixproofoutcomeexcluded2(inputs)
	if (locale === "fr") return fr_fixproofoutcomeexcluded2(inputs)
	if (locale === "uk") return uk_fixproofoutcomeexcluded2(inputs)
	return en_fixproofoutcomeexcluded2(inputs)
});
export { fixproofoutcomeexcluded2 as "fixproofOutcomeExcluded" }