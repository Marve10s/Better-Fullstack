/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkdescription1Inputs */

const en_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const es_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const zh_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const ja_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const ko_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const zh_hant1_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const de_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const fr_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

const uk_benchmarkdescription1 = /** @type {(inputs: Benchmarkdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests.`)
};

/**
* | output |
* | --- |
* | "Fixproof grades coding agents on sealed, real issues from private codebases, verified by hidden tests." |
*
* @param {Benchmarkdescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkdescription1 = /** @type {((inputs?: Benchmarkdescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkdescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_benchmarkdescription1(inputs)
	if (locale === "zh") return zh_benchmarkdescription1(inputs)
	if (locale === "ja") return ja_benchmarkdescription1(inputs)
	if (locale === "ko") return ko_benchmarkdescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkdescription1(inputs)
	if (locale === "de") return de_benchmarkdescription1(inputs)
	if (locale === "fr") return fr_benchmarkdescription1(inputs)
	if (locale === "uk") return uk_benchmarkdescription1(inputs)
	return en_benchmarkdescription1(inputs)
});
export { benchmarkdescription1 as "benchmarkDescription" }