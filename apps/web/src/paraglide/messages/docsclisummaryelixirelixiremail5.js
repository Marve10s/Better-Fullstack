/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixiremail5Inputs */

const en_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir email.`)
};

const es_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Correo electrónico en Elixir.`)
};

const zh_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 邮件。`)
};

const ja_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のメール。`)
};

const ko_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 이메일.`)
};

const zh_hant1_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 電子郵件。`)
};

const de_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`E-Mail für Elixir.`)
};

const fr_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`E-mail Elixir.`)
};

const uk_docsclisummaryelixirelixiremail5 = /** @type {(inputs: Docsclisummaryelixirelixiremail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Електронна пошта в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir email." |
*
* @param {Docsclisummaryelixirelixiremail5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixiremail5 = /** @type {((inputs?: Docsclisummaryelixirelixiremail5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixiremail5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixiremail5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixiremail5(inputs)
	return en_docsclisummaryelixirelixiremail5(inputs)
});
export { docsclisummaryelixirelixiremail5 as "docsCliSummaryElixirElixirEmail" }