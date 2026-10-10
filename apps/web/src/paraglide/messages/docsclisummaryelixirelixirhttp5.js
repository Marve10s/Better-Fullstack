/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirhttp5Inputs */

const en_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP client.`)
};

const es_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente HTTP Elixir.`)
};

const zh_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 客户端。`)
};

const ja_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の HTTP クライアント。`)
};

const ko_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 클라이언트.`)
};

const zh_hant1_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 用戶端。`)
};

const de_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-Client für Elixir.`)
};

const fr_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client HTTP Elixir.`)
};

const uk_docsclisummaryelixirelixirhttp5 = /** @type {(inputs: Docsclisummaryelixirelixirhttp5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-клієнт Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir HTTP client." |
*
* @param {Docsclisummaryelixirelixirhttp5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirhttp5 = /** @type {((inputs?: Docsclisummaryelixirelixirhttp5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirhttp5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirhttp5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirhttp5(inputs)
	return en_docsclisummaryelixirelixirhttp5(inputs)
});
export { docsclisummaryelixirelixirhttp5 as "docsCliSummaryElixirElixirHttp" }