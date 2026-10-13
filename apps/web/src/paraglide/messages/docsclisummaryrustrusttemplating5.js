/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrusttemplating5Inputs */

const en_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust templating.`)
};

const es_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Motor de plantillas Rust.`)
};

const zh_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 模板引擎。`)
};

const ja_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のテンプレートエンジン。`)
};

const ko_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 템플릿 엔진.`)
};

const zh_hant1_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 範本引擎。`)
};

const de_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template-Verarbeitung für Rust.`)
};

const fr_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestion des templates Rust.`)
};

const uk_docsclisummaryrustrusttemplating5 = /** @type {(inputs: Docsclisummaryrustrusttemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Обробка шаблонів у Rust.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "de") return de_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrusttemplating5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrusttemplating5(inputs)
	return en_docsclisummaryrustrusttemplating5(inputs)
});
export { docsclisummaryrustrusttemplating5 as "docsCliSummaryRustRustTemplating" }