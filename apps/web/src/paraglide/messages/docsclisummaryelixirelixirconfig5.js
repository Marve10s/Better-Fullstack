/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirconfig5Inputs */

const en_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir runtime configuration.`)
};

const es_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración en tiempo de ejecución para Elixir.`)
};

const zh_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 运行时配置。`)
};

const ja_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の実行時設定。`)
};

const ko_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 런타임 설정.`)
};

const zh_hant1_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 執行階段設定。`)
};

const de_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laufzeitkonfiguration für Elixir.`)
};

const fr_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration d'exécution Elixir.`)
};

const uk_docsclisummaryelixirelixirconfig5 = /** @type {(inputs: Docsclisummaryelixirelixirconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Конфігурація під час виконання в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir runtime configuration." |
*
* @param {Docsclisummaryelixirelixirconfig5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirconfig5 = /** @type {((inputs?: Docsclisummaryelixirelixirconfig5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirconfig5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirconfig5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirconfig5(inputs)
	return en_docsclisummaryelixirelixirconfig5(inputs)
});
export { docsclisummaryelixirelixirconfig5 as "docsCliSummaryElixirElixirConfig" }