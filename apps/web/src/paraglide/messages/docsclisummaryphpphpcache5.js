/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpcache5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de caché de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 缓存库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP のキャッシュライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 캐시 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 快取函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-Cache-Bibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de cache PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека кешування PHP.")
	return /** @type {LocalizedString} */ ("PHP cache library.")
});
export { docsclisummaryphpphpcache5 as "docsCliSummaryPhpPhpCache" }