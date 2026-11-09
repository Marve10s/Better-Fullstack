/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrusterrorhandling6Inputs */



/**
* | output |
* | --- |
* | "Rust error handling." |
*
* @param {Docsclisummaryrustrusterrorhandling6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrusterrorhandling6 = /** @type {((inputs?: Docsclisummaryrustrusterrorhandling6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrusterrorhandling6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gestión de errores en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 错误处理。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のエラー処理。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 오류 처리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 錯誤處理。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Fehlerbehandlung für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestion des erreurs Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Обробка помилок у Rust.")
	return /** @type {LocalizedString} */ ("Rust error handling.")
});
export { docsclisummaryrustrusterrorhandling6 as "docsCliSummaryRustRustErrorHandling" }