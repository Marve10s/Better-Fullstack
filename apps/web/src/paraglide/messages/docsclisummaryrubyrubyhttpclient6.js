/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyhttpclient6Inputs */



/**
* | output |
* | --- |
* | "Ruby HTTP client." |
*
* @param {Docsclisummaryrubyrubyhttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyhttpclient6 = /** @type {((inputs?: Docsclisummaryrubyrubyhttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyhttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente HTTP de Ruby.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Ruby HTTP 客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Ruby の HTTP クライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Ruby HTTP 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Ruby HTTP 用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ruby-HTTP-Client.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client HTTP Ruby.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-клієнт Ruby.")
	return /** @type {LocalizedString} */ ("Ruby HTTP client.")
});
export { docsclisummaryrubyrubyhttpclient6 as "docsCliSummaryRubyRubyHttpClient" }