/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomepending2Inputs */

const en_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

const es_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pendiente`)
};

const zh_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待运行`)
};

const ja_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保留中`)
};

const ko_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`대기 중`)
};

const zh_hant1_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待執行`)
};

const de_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ausstehend`)
};

const fr_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En attente`)
};

const uk_fixproofoutcomepending2 = /** @type {(inputs: Fixproofoutcomepending2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`В очікуванні`)
};

/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Fixproofoutcomepending2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomepending2 = /** @type {((inputs?: Fixproofoutcomepending2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomepending2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomepending2(inputs)
	if (locale === "zh") return zh_fixproofoutcomepending2(inputs)
	if (locale === "ja") return ja_fixproofoutcomepending2(inputs)
	if (locale === "ko") return ko_fixproofoutcomepending2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomepending2(inputs)
	if (locale === "de") return de_fixproofoutcomepending2(inputs)
	if (locale === "fr") return fr_fixproofoutcomepending2(inputs)
	if (locale === "uk") return uk_fixproofoutcomepending2(inputs)
	return en_fixproofoutcomepending2(inputs)
});
export { fixproofoutcomepending2 as "fixproofOutcomePending" }