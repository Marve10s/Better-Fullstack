/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderapigroup2Inputs */

const en_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const es_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`API ${i?.ecosystem}`)
};

const zh_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const ja_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const ko_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const zh_hant1_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const de_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const fr_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

const uk_builderapigroup2 = /** @type {(inputs: Builderapigroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
};

/**
* | output |
* | --- |
* | "{ecosystem} API" |
*
* @param {Builderapigroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderapigroup2 = /** @type {((inputs: Builderapigroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderapigroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderapigroup2(inputs)
	if (locale === "es") return es_builderapigroup2(inputs)
	if (locale === "zh") return zh_builderapigroup2(inputs)
	if (locale === "ja") return ja_builderapigroup2(inputs)
	if (locale === "ko") return ko_builderapigroup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderapigroup2(inputs)
	if (locale === "de") return de_builderapigroup2(inputs)
	if (locale === "fr") return fr_builderapigroup2(inputs)
	return uk_builderapigroup2(inputs)
});
export { builderapigroup2 as "builderApiGroup" }