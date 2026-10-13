/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirwebframework6Inputs */

const en_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir web framework.`)
};

const es_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Elixir.`)
};

const zh_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir Web 框架。`)
};

const ja_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の Web フレームワーク。`)
};

const ko_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 웹 프레임워크.`)
};

const zh_hant1_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir Web 框架。`)
};

const de_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für Elixir.`)
};

const fr_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Elixir.`)
};

const uk_docsclisummaryelixirelixirwebframework6 = /** @type {(inputs: Docsclisummaryelixirelixirwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir web framework." |
*
* @param {Docsclisummaryelixirelixirwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirwebframework6 = /** @type {((inputs?: Docsclisummaryelixirelixirwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirwebframework6(inputs)
	return en_docsclisummaryelixirelixirwebframework6(inputs)
});
export { docsclisummaryelixirelixirwebframework6 as "docsCliSummaryElixirElixirWebFramework" }