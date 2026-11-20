/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubycache5Inputs */



/**
* | output |
* | --- |
* | "Ruby cache store." |
*
* @param {Docsclisummaryrubyrubycache5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubycache5 = /** @type {((inputs?: Docsclisummaryrubyrubycache5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubycache5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Almacén de caché de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby 缓存存储。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby のキャッシュストア。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby 캐시 저장소.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby 快取儲存。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-Cache-Speicher.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Stockage de cache Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сховище кешу Ruby.")
	return /** @type {LocalizedString} */ ("Ruby cache store.")
});
export { docsclisummaryrubyrubycache5 as "docsCliSummaryRubyRubyCache" }