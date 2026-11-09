/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirtemplating5Inputs */



/**
* | output |
* | --- |
* | "Elixir text templating engine." |
*
* @param {Docsclisummaryelixirelixirtemplating5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirtemplating5 = /** @type {((inputs?: Docsclisummaryelixirelixirtemplating5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirtemplating5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Motor de plantillas de texto para Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 文本模板引擎。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のテキストテンプレートエンジン。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 텍스트 템플릿 엔진.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 文字範本引擎。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Text-Template-Engine für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Moteur de templates texte Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Рушій текстових шаблонів для Elixir.")
	return /** @type {LocalizedString} */ ("Elixir text templating engine.")
});
export { docsclisummaryelixirelixirtemplating5 as "docsCliSummaryElixirElixirTemplating" }