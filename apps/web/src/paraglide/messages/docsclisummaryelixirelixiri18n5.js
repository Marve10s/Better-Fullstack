/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixiri18n5Inputs */

const en_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir internationalization.`)
};

const es_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internacionalización en Elixir.`)
};

const zh_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 国际化。`)
};

const ja_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の国際化。`)
};

const ko_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 국제화.`)
};

const zh_hant1_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 國際化。`)
};

const de_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internationalisierung für Elixir.`)
};

const fr_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Internationalisation Elixir.`)
};

const uk_docsclisummaryelixirelixiri18n5 = /** @type {(inputs: Docsclisummaryelixirelixiri18n5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інтернаціоналізація в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir internationalization." |
*
* @param {Docsclisummaryelixirelixiri18n5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixiri18n5 = /** @type {((inputs?: Docsclisummaryelixirelixiri18n5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixiri18n5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixiri18n5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixiri18n5(inputs)
	return en_docsclisummaryelixirelixiri18n5(inputs)
});
export { docsclisummaryelixirelixiri18n5 as "docsCliSummaryElixirElixirI18n" }