/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirapplicationframework6Inputs */

const en_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir application framework.`)
};

const es_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework de aplicaciones Elixir.`)
};

const zh_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 应用框架。`)
};

const ja_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のアプリケーションフレームワーク。`)
};

const ko_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 애플리케이션 프레임워크.`)
};

const zh_hant1_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 應用程式框架。`)
};

const de_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anwendungsframework für Elixir.`)
};

const fr_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework d’application Elixir.`)
};

const uk_docsclisummaryelixirelixirapplicationframework6 = /** @type {(inputs: Docsclisummaryelixirelixirapplicationframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фреймворк застосунків Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir application framework." |
*
* @param {Docsclisummaryelixirelixirapplicationframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirapplicationframework6 = /** @type {((inputs?: Docsclisummaryelixirelixirapplicationframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirapplicationframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirapplicationframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirapplicationframework6(inputs)
	return en_docsclisummaryelixirelixirapplicationframework6(inputs)
});
export { docsclisummaryelixirelixirapplicationframework6 as "docsCliSummaryElixirElixirApplicationFramework" }