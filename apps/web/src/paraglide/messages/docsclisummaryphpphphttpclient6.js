/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphphttpclient6Inputs */



/**
* | output |
* | --- |
* | "PHP HTTP client." |
*
* @param {Docsclisummaryphpphphttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphphttpclient6 = /** @type {((inputs?: Docsclisummaryphpphphttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphphttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente HTTP de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP HTTP 客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP の HTTP クライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP HTTP 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP HTTP 用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-HTTP-Client.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client HTTP PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-клієнт PHP.")
	return /** @type {LocalizedString} */ ("PHP HTTP client.")
});
export { docsclisummaryphpphphttpclient6 as "docsCliSummaryPhpPhpHttpClient" }