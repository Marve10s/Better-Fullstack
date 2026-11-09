/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoauth5Inputs */



/**
* | output |
* | --- |
* | "Go-native auth helpers." |
*
* @param {Docsclisummarygogoauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoauth5 = /** @type {((inputs?: Docsclisummarygogoauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Bibliotecas auxiliares de autenticación nativas de Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 原生认证辅助工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go ネイティブの認証ヘルパー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 네이티브 인증 헬퍼.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 原生驗證輔助工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Native Go-Hilfsbibliotheken zur Authentifizierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques natives Go d’aide à l’authentification.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Нативні допоміжні бібліотеки Go для автентифікації.")
	return /** @type {LocalizedString} */ ("Go-native auth helpers.")
});
export { docsclisummarygogoauth5 as "docsCliSummaryGoGoAuth" }