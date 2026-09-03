/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomesolved2Inputs */

const en_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solved`)
};

const es_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resuelta`)
};

const zh_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解决`)
};

const ja_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解決`)
};

const ko_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`해결`)
};

const zh_hant1_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解決`)
};

const de_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gelöst`)
};

const fr_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Résolue`)
};

const uk_fixproofoutcomesolved2 = /** @type {(inputs: Fixproofoutcomesolved2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вирішено`)
};

/**
* | output |
* | --- |
* | "Solved" |
*
* @param {Fixproofoutcomesolved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomesolved2 = /** @type {((inputs?: Fixproofoutcomesolved2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomesolved2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomesolved2(inputs)
	if (locale === "zh") return zh_fixproofoutcomesolved2(inputs)
	if (locale === "ja") return ja_fixproofoutcomesolved2(inputs)
	if (locale === "ko") return ko_fixproofoutcomesolved2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomesolved2(inputs)
	if (locale === "de") return de_fixproofoutcomesolved2(inputs)
	if (locale === "fr") return fr_fixproofoutcomesolved2(inputs)
	if (locale === "uk") return uk_fixproofoutcomesolved2(inputs)
	return en_fixproofoutcomesolved2(inputs)
});
export { fixproofoutcomesolved2 as "fixproofOutcomeSolved" }