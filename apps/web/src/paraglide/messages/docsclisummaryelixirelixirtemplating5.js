/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirtemplating5Inputs */

const en_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir text templating engine.`)
};

const es_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Motor de plantillas de texto para Elixir.`)
};

const zh_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 文本模板引擎。`)
};

const ja_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のテキストテンプレートエンジン。`)
};

const ko_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 텍스트 템플릿 엔진.`)
};

const zh_hant1_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 文字範本引擎。`)
};

const de_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Text-Template-Engine für Elixir.`)
};

const fr_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Moteur de templates texte Elixir.`)
};

const uk_docsclisummaryelixirelixirtemplating5 = /** @type {(inputs: Docsclisummaryelixirelixirtemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Рушій текстових шаблонів для Elixir.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirtemplating5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirtemplating5(inputs)
	return en_docsclisummaryelixirelixirtemplating5(inputs)
});
export { docsclisummaryelixirelixirtemplating5 as "docsCliSummaryElixirElixirTemplating" }