/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixircli5Inputs */

const en_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir command-line tooling.`)
};

const es_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas de línea de comandos para Elixir.`)
};

const zh_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 命令行工具。`)
};

const ja_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のコマンドラインツール。`)
};

const ko_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 명령줄 도구.`)
};

const zh_hant1_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 命令列工具。`)
};

const de_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kommandozeilen-Tools für Elixir.`)
};

const fr_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils en ligne de commande Elixir.`)
};

const uk_docsclisummaryelixirelixircli5 = /** @type {(inputs: Docsclisummaryelixirelixircli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструменти командного рядка для Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir command-line tooling." |
*
* @param {Docsclisummaryelixirelixircli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixircli5 = /** @type {((inputs?: Docsclisummaryelixirelixircli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixircli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixircli5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixircli5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixircli5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixircli5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixircli5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixircli5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixircli5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixircli5(inputs)
	return en_docsclisummaryelixirelixircli5(inputs)
});
export { docsclisummaryelixirelixircli5 as "docsCliSummaryElixirElixirCli" }