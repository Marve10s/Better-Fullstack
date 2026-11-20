/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesratelimit6Inputs */



/**
* | output |
* | --- |
* | "Rate limiting helper." |
*
* @param {Docsclisummarytypescriptservicesratelimit6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesratelimit6 = /** @type {((inputs?: Docsclisummarytypescriptservicesratelimit6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesratelimit6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca auxiliar para limitar la tasa de solicitudes.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("限流辅助工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レート制限のヘルパー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("속도 제한 헬퍼.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("速率限制輔助工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Hilfsbibliothek zur Begrenzung der Anfragerate.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de limitation du débit de requêtes.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Допоміжна бібліотека для обмеження частоти запитів.")
	return /** @type {LocalizedString} */ ("Rate limiting helper.")
});
export { docsclisummarytypescriptservicesratelimit6 as "docsCliSummaryTypescriptServicesRateLimit" }