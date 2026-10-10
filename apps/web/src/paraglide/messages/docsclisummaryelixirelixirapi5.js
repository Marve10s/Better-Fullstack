/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirapi5Inputs */

const en_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir API layer.`)
};

const es_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Capa API Elixir.`)
};

const zh_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir API 层。`)
};

const ja_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の API レイヤー。`)
};

const ko_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir API 계층.`)
};

const zh_hant1_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir API 層。`)
};

const de_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schicht für Elixir.`)
};

const fr_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couche API Elixir.`)
};

const uk_docsclisummaryelixirelixirapi5 = /** @type {(inputs: Docsclisummaryelixirelixirapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шар API для Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir API layer." |
*
* @param {Docsclisummaryelixirelixirapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirapi5 = /** @type {((inputs?: Docsclisummaryelixirelixirapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirapi5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirapi5(inputs)
	return en_docsclisummaryelixirelixirapi5(inputs)
});
export { docsclisummaryelixirelixirapi5 as "docsCliSummaryElixirElixirApi" }