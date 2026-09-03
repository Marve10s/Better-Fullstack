/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartnote2Inputs */

const en_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`faster + higher ↗`)
};

const es_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más rápido + más alto ↗`)
};

const zh_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更快 + 更高 ↗`)
};

const ja_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`速い + 高い ↗`)
};

const ko_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빠를수록 + 높을수록 ↗`)
};

const zh_hant1_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更快 + 更高 ↗`)
};

const de_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`schneller + höher ↗`)
};

const fr_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plus rapide + plus haut ↗`)
};

const uk_fixproofchartnote2 = /** @type {(inputs: Fixproofchartnote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`швидше + вище ↗`)
};

/**
* | output |
* | --- |
* | "faster + higher ↗" |
*
* @param {Fixproofchartnote2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartnote2 = /** @type {((inputs?: Fixproofchartnote2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartnote2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartnote2(inputs)
	if (locale === "zh") return zh_fixproofchartnote2(inputs)
	if (locale === "ja") return ja_fixproofchartnote2(inputs)
	if (locale === "ko") return ko_fixproofchartnote2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartnote2(inputs)
	if (locale === "de") return de_fixproofchartnote2(inputs)
	if (locale === "fr") return fr_fixproofchartnote2(inputs)
	if (locale === "uk") return uk_fixproofchartnote2(inputs)
	return en_fixproofchartnote2(inputs)
});
export { fixproofchartnote2 as "fixproofChartNote" }