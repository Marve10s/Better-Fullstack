/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomepartial2Inputs */

const en_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partial`)
};

const es_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Parcial`)
};

const zh_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部分完成`)
};

const ja_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部分的`)
};

const ko_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`부분`)
};

const zh_hant1_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部分完成`)
};

const de_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teilweise`)
};

const fr_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partielle`)
};

const uk_fixproofoutcomepartial2 = /** @type {(inputs: Fixproofoutcomepartial2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Частково`)
};

/**
* | output |
* | --- |
* | "Partial" |
*
* @param {Fixproofoutcomepartial2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomepartial2 = /** @type {((inputs?: Fixproofoutcomepartial2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomepartial2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomepartial2(inputs)
	if (locale === "zh") return zh_fixproofoutcomepartial2(inputs)
	if (locale === "ja") return ja_fixproofoutcomepartial2(inputs)
	if (locale === "ko") return ko_fixproofoutcomepartial2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomepartial2(inputs)
	if (locale === "de") return de_fixproofoutcomepartial2(inputs)
	if (locale === "fr") return fr_fixproofoutcomepartial2(inputs)
	if (locale === "uk") return uk_fixproofoutcomepartial2(inputs)
	return en_fixproofoutcomepartial2(inputs)
});
export { fixproofoutcomepartial2 as "fixproofOutcomePartial" }