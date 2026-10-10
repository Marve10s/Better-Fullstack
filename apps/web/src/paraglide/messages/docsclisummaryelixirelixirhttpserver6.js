/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirhttpserver6Inputs */

const en_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP server.`)
};

const es_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servidor HTTP Elixir.`)
};

const zh_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 服务器。`)
};

const ja_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir の HTTP サーバー。`)
};

const ko_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 서버.`)
};

const zh_hant1_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir HTTP 伺服器。`)
};

const de_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-Server für Elixir.`)
};

const fr_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Serveur HTTP Elixir.`)
};

const uk_docsclisummaryelixirelixirhttpserver6 = /** @type {(inputs: Docsclisummaryelixirelixirhttpserver6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-сервер Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir HTTP server." |
*
* @param {Docsclisummaryelixirelixirhttpserver6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirhttpserver6 = /** @type {((inputs?: Docsclisummaryelixirelixirhttpserver6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirhttpserver6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirhttpserver6(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirhttpserver6(inputs)
	return en_docsclisummaryelixirelixirhttpserver6(inputs)
});
export { docsclisummaryelixirelixirhttpserver6 as "docsCliSummaryElixirElixirHttpServer" }