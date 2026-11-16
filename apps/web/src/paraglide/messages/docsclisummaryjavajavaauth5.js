/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaauth5Inputs */



/**
* | output |
* | --- |
* | "Java auth." |
*
* @param {Docsclisummaryjavajavaauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavaauth5 = /** @type {((inputs?: Docsclisummaryjavajavaauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavaauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación en Java.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung für Java.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification Java.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація в Java.")
	return /** @type {LocalizedString} */ ("Java auth.")
});
export { docsclisummaryjavajavaauth5 as "docsCliSummaryJavaJavaAuth" }