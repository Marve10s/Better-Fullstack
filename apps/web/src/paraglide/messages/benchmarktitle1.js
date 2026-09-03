/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarktitle1Inputs */

const en_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const es_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const zh_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const ja_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const ko_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const zh_hant1_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const de_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const fr_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

const uk_benchmarktitle1 = /** @type {(inputs: Benchmarktitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof`)
};

/**
* | output |
* | --- |
* | "Fixproof" |
*
* @param {Benchmarktitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarktitle1 = /** @type {((inputs?: Benchmarktitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarktitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_benchmarktitle1(inputs)
	if (locale === "zh") return zh_benchmarktitle1(inputs)
	if (locale === "ja") return ja_benchmarktitle1(inputs)
	if (locale === "ko") return ko_benchmarktitle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarktitle1(inputs)
	if (locale === "de") return de_benchmarktitle1(inputs)
	if (locale === "fr") return fr_benchmarktitle1(inputs)
	if (locale === "uk") return uk_benchmarktitle1(inputs)
	return en_benchmarktitle1(inputs)
});
export { benchmarktitle1 as "benchmarkTitle" }