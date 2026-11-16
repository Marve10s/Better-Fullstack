/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrusttemplating5Inputs */



/**
* | output |
* | --- |
* | "Rust templating." |
*
* @param {Docsclisummaryrustrusttemplating5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrusttemplating5 = /** @type {((inputs?: Docsclisummaryrustrusttemplating5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrusttemplating5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Motor de plantillas Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 模板引擎。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のテンプレートエンジン。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 템플릿 엔진.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 範本引擎。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Template-Verarbeitung für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestion des templates Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Обробка шаблонів у Rust.")
	return /** @type {LocalizedString} */ ("Rust templating.")
});
export { docsclisummaryrustrusttemplating5 as "docsCliSummaryRustRustTemplating" }