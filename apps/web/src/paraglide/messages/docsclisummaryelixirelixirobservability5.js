/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirobservability5Inputs */

const en_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir observability.`)
};

const es_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilidad en Elixir.`)
};

const zh_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 可观测性。`)
};

const ja_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のオブザーバビリティ。`)
};

const ko_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 관측성.`)
};

const zh_hant1_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 可觀測性。`)
};

const de_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability für Elixir.`)
};

const fr_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilité Elixir.`)
};

const uk_docsclisummaryelixirelixirobservability5 = /** @type {(inputs: Docsclisummaryelixirelixirobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спостережуваність у Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir observability." |
*
* @param {Docsclisummaryelixirelixirobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirobservability5 = /** @type {((inputs?: Docsclisummaryelixirelixirobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirobservability5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirobservability5(inputs)
	return en_docsclisummaryelixirelixirobservability5(inputs)
});
export { docsclisummaryelixirelixirobservability5 as "docsCliSummaryElixirElixirObservability" }