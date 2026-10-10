/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicescaching5Inputs */

const en_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cache layer.`)
};

const es_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa de caché.`)
};

const zh_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`缓存层。`)
};

const ja_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`キャッシュレイヤー。`)
};

const ko_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`캐시 계층.`)
};

const zh_hant1_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快取層。`)
};

const de_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cache-Schicht.`)
};

const fr_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche de cache.`)
};

const uk_docsclisummarytypescriptservicescaching5 = /** @type {(inputs: Docsclisummarytypescriptservicescaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар кешування.`)
};

/**
* | output |
* | --- |
* | "Cache layer." |
*
* @param {Docsclisummarytypescriptservicescaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicescaching5 = /** @type {((inputs?: Docsclisummarytypescriptservicescaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicescaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicescaching5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicescaching5(inputs)
	return en_docsclisummarytypescriptservicescaching5(inputs)
});
export { docsclisummarytypescriptservicescaching5 as "docsCliSummaryTypescriptServicesCaching" }