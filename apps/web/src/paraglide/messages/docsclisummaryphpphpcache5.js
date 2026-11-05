/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpcache5Inputs */

const en_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP cache library.`)
};

const es_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de caché de PHP.`)
};

const zh_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 缓存库。`)
};

const ja_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP のキャッシュライブラリ。`)
};

const ko_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 캐시 라이브러리.`)
};

const zh_hant1_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 快取函式庫。`)
};

const de_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Cache-Bibliothek.`)
};

const fr_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de cache PHP.`)
};

const uk_docsclisummaryphpphpcache5 = /** @type {(inputs: Docsclisummaryphpphpcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека кешування PHP.`)
};

/**
* | output |
* | --- |
* | "PHP cache library." |
*
* @param {Docsclisummaryphpphpcache5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpcache5 = /** @type {((inputs?: Docsclisummaryphpphpcache5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpcache5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpcache5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpcache5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpcache5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpcache5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpcache5(inputs)
	if (locale === "de") return de_docsclisummaryphpphpcache5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpcache5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpcache5(inputs)
	return en_docsclisummaryphpphpcache5(inputs)
});
export { docsclisummaryphpphpcache5 as "docsCliSummaryPhpPhpCache" }