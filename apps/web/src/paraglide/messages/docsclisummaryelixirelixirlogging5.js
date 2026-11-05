/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirlogging5Inputs */

const en_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir logging.`)
};

const es_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de logs en Elixir.`)
};

const zh_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 日志。`)
};

const ja_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のロギング。`)
};

const ko_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 로깅.`)
};

const zh_hant1_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 日誌。`)
};

const de_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging für Elixir.`)
};

const fr_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation Elixir.`)
};

const uk_docsclisummaryelixirelixirlogging5 = /** @type {(inputs: Docsclisummaryelixirelixirlogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Логування в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir logging." |
*
* @param {Docsclisummaryelixirelixirlogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirlogging5 = /** @type {((inputs?: Docsclisummaryelixirelixirlogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirlogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirlogging5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirlogging5(inputs)
	return en_docsclisummaryelixirelixirlogging5(inputs)
});
export { docsclisummaryelixirelixirlogging5 as "docsCliSummaryElixirElixirLogging" }