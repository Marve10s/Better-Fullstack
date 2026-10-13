/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirdocumentation5Inputs */

const en_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir documentation.`)
};

const es_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documentación de Elixir.`)
};

const zh_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 文档生成。`)
};

const ja_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のドキュメント生成。`)
};

const ko_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 문서화.`)
};

const zh_hant1_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 文件產生。`)
};

const de_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumentation für Elixir.`)
};

const fr_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documentation Elixir.`)
};

const uk_docsclisummaryelixirelixirdocumentation5 = /** @type {(inputs: Docsclisummaryelixirelixirdocumentation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Документація Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir documentation." |
*
* @param {Docsclisummaryelixirelixirdocumentation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirdocumentation5 = /** @type {((inputs?: Docsclisummaryelixirelixirdocumentation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirdocumentation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirdocumentation5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirdocumentation5(inputs)
	return en_docsclisummaryelixirelixirdocumentation5(inputs)
});
export { docsclisummaryelixirelixirdocumentation5 as "docsCliSummaryElixirElixirDocumentation" }