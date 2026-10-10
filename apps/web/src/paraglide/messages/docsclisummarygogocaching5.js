/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogocaching5Inputs */

const en_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go caching.`)
};

const es_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caché en Go.`)
};

const zh_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 缓存。`)
};

const ja_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のキャッシュ。`)
};

const ko_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 캐싱.`)
};

const zh_hant1_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 快取。`)
};

const de_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caching für Go.`)
};

const fr_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise en cache Go.`)
};

const uk_docsclisummarygogocaching5 = /** @type {(inputs: Docsclisummarygogocaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кешування в Go.`)
};

/**
* | output |
* | --- |
* | "Go caching." |
*
* @param {Docsclisummarygogocaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogocaching5 = /** @type {((inputs?: Docsclisummarygogocaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogocaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogocaching5(inputs)
	if (locale === "zh") return zh_docsclisummarygogocaching5(inputs)
	if (locale === "ja") return ja_docsclisummarygogocaching5(inputs)
	if (locale === "ko") return ko_docsclisummarygogocaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogocaching5(inputs)
	if (locale === "de") return de_docsclisummarygogocaching5(inputs)
	if (locale === "fr") return fr_docsclisummarygogocaching5(inputs)
	if (locale === "uk") return uk_docsclisummarygogocaching5(inputs)
	return en_docsclisummarygogocaching5(inputs)
});
export { docsclisummarygogocaching5 as "docsCliSummaryGoGoCaching" }