/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionweb3Inputs */

const en_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const es_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const zh_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const ja_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const ko_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`웹`)
};

const zh_hant1_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const de_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const fr_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web`)
};

const uk_builderlanguagesectionweb3 = /** @type {(inputs: Builderlanguagesectionweb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Веб`)
};

/**
* | output |
* | --- |
* | "Web" |
*
* @param {Builderlanguagesectionweb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionweb3 = /** @type {((inputs?: Builderlanguagesectionweb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionweb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlanguagesectionweb3(inputs)
	if (locale === "zh") return zh_builderlanguagesectionweb3(inputs)
	if (locale === "ja") return ja_builderlanguagesectionweb3(inputs)
	if (locale === "ko") return ko_builderlanguagesectionweb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlanguagesectionweb3(inputs)
	if (locale === "de") return de_builderlanguagesectionweb3(inputs)
	if (locale === "fr") return fr_builderlanguagesectionweb3(inputs)
	if (locale === "uk") return uk_builderlanguagesectionweb3(inputs)
	return en_builderlanguagesectionweb3(inputs)
});
export { builderlanguagesectionweb3 as "builderLanguageSectionWeb" }