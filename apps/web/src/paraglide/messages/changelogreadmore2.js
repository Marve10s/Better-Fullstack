/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogreadmore2Inputs */

const en_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read more`)
};

const es_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer más`)
};

const zh_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读更多`)
};

const ja_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`続きを読む`)
};

const ko_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`더 보기`)
};

const zh_hant1_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀更多`)
};

const de_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mehr lesen`)
};

const fr_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En savoir plus`)
};

const uk_changelogreadmore2 = /** @type {(inputs: Changelogreadmore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Докладніше`)
};

/**
* | output |
* | --- |
* | "Read more" |
*
* @param {Changelogreadmore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogreadmore2 = /** @type {((inputs?: Changelogreadmore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogreadmore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogreadmore2(inputs)
	if (locale === "zh") return zh_changelogreadmore2(inputs)
	if (locale === "ja") return ja_changelogreadmore2(inputs)
	if (locale === "ko") return ko_changelogreadmore2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogreadmore2(inputs)
	if (locale === "de") return de_changelogreadmore2(inputs)
	if (locale === "fr") return fr_changelogreadmore2(inputs)
	if (locale === "uk") return uk_changelogreadmore2(inputs)
	return en_changelogreadmore2(inputs)
});
export { changelogreadmore2 as "changelogReadMore" }