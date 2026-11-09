/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonhttpclient6Inputs */



/**
* | output |
* | --- |
* | "Python HTTP client." |
*
* @param {Docsclisummarypythonpythonhttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonhttpclient6 = /** @type {((inputs?: Docsclisummarypythonpythonhttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonhttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente HTTP Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python HTTP 客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の HTTP クライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python HTTP 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python HTTP 用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("HTTP-Client für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client HTTP Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-клієнт Python.")
	return /** @type {LocalizedString} */ ("Python HTTP client.")
});
export { docsclisummarypythonpythonhttpclient6 as "docsCliSummaryPythonPythonHttpClient" }