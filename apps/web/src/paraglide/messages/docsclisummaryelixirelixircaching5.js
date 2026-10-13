/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixircaching5Inputs */

const en_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir caching.`)
};

const es_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caché en Elixir.`)
};

const zh_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 缓存。`)
};

const ja_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のキャッシュ。`)
};

const ko_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 캐싱.`)
};

const zh_hant1_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 快取。`)
};

const de_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caching für Elixir.`)
};

const fr_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise en cache Elixir.`)
};

const uk_docsclisummaryelixirelixircaching5 = /** @type {(inputs: Docsclisummaryelixirelixircaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кешування в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir caching." |
*
* @param {Docsclisummaryelixirelixircaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixircaching5 = /** @type {((inputs?: Docsclisummaryelixirelixircaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixircaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixircaching5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixircaching5(inputs)
	return en_docsclisummaryelixirelixircaching5(inputs)
});
export { docsclisummaryelixirelixircaching5 as "docsCliSummaryElixirElixirCaching" }