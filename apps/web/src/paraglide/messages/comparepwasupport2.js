/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepwasupport2Inputs */

const en_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA support`)
};

const es_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Soporte PWA`)
};

const zh_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA 支持`)
};

const ja_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWAのサポート`)
};

const ko_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA 지원`)
};

const zh_hant1_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA 支援`)
};

const de_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PWA-Unterstützung`)
};

const fr_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prise en charge des PWA`)
};

const uk_comparepwasupport2 = /** @type {(inputs: Comparepwasupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підтримка PWA`)
};

/**
* | output |
* | --- |
* | "PWA support" |
*
* @param {Comparepwasupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparepwasupport2 = /** @type {((inputs?: Comparepwasupport2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepwasupport2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepwasupport2(inputs)
	if (locale === "es") return es_comparepwasupport2(inputs)
	if (locale === "zh") return zh_comparepwasupport2(inputs)
	if (locale === "ja") return ja_comparepwasupport2(inputs)
	if (locale === "ko") return ko_comparepwasupport2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparepwasupport2(inputs)
	if (locale === "de") return de_comparepwasupport2(inputs)
	if (locale === "fr") return fr_comparepwasupport2(inputs)
	return uk_comparepwasupport2(inputs)
});
export { comparepwasupport2 as "comparePwaSupport" }