/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirvalidation5Inputs */

const en_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir validation.`)
};

const es_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validación en Elixir.`)
};

const zh_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 校验。`)
};

const ja_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のバリデーション。`)
};

const ko_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 검증.`)
};

const zh_hant1_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 驗證。`)
};

const de_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validierung für Elixir.`)
};

const fr_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation Elixir.`)
};

const uk_docsclisummaryelixirelixirvalidation5 = /** @type {(inputs: Docsclisummaryelixirelixirvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Валідація в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir validation." |
*
* @param {Docsclisummaryelixirelixirvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirvalidation5 = /** @type {((inputs?: Docsclisummaryelixirelixirvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirvalidation5(inputs)
	return en_docsclisummaryelixirelixirvalidation5(inputs)
});
export { docsclisummaryelixirelixirvalidation5 as "docsCliSummaryElixirElixirValidation" }