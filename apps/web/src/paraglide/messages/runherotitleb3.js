/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runherotitleb3Inputs */

const en_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`yourself`)
};

const es_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tú mismo`)
};

const zh_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自己试试`)
};

const ja_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなた自身`)
};

const ko_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`직접`)
};

const zh_hant1_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你自己`)
};

const de_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`selbst`)
};

const fr_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`vous-même`)
};

const uk_runherotitleb3 = /** @type {(inputs: Runherotitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`самостійно`)
};

/**
* | output |
* | --- |
* | "yourself" |
*
* @param {Runherotitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runherotitleb3 = /** @type {((inputs?: Runherotitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runherotitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runherotitleb3(inputs)
	if (locale === "zh") return zh_runherotitleb3(inputs)
	if (locale === "ja") return ja_runherotitleb3(inputs)
	if (locale === "ko") return ko_runherotitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runherotitleb3(inputs)
	if (locale === "de") return de_runherotitleb3(inputs)
	if (locale === "fr") return fr_runherotitleb3(inputs)
	if (locale === "uk") return uk_runherotitleb3(inputs)
	return en_runherotitleb3(inputs)
});
export { runherotitleb3 as "runHeroTitleB" }