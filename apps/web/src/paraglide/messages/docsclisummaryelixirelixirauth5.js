/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirauth5Inputs */

const en_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir auth.`)
};

const es_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación en Elixir.`)
};

const zh_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 认证。`)
};

const ja_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の認証。`)
};

const ko_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 인증.`)
};

const zh_hant1_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 驗證。`)
};

const de_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung für Elixir.`)
};

const fr_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification Elixir.`)
};

const uk_docsclisummaryelixirelixirauth5 = /** @type {(inputs: Docsclisummaryelixirelixirauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir auth." |
*
* @param {Docsclisummaryelixirelixirauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirauth5 = /** @type {((inputs?: Docsclisummaryelixirelixirauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirauth5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirauth5(inputs)
	return en_docsclisummaryelixirelixirauth5(inputs)
});
export { docsclisummaryelixirelixirauth5 as "docsCliSummaryElixirElixirAuth" }