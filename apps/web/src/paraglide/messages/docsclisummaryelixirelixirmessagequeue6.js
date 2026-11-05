/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirmessagequeue6Inputs */

const en_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir message broker client.`)
};

const es_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente de broker de mensajes para Elixir.`)
};

const zh_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 消息代理客户端。`)
};

const ja_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のメッセージブローカークライアント。`)
};

const ko_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 메시지 브로커 클라이언트.`)
};

const zh_hant1_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 訊息代理用戶端。`)
};

const de_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message-Broker-Client für Elixir.`)
};

const fr_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client de broker de messages Elixir.`)
};

const uk_docsclisummaryelixirelixirmessagequeue6 = /** @type {(inputs: Docsclisummaryelixirelixirmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Клієнт брокера повідомлень для Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir message broker client." |
*
* @param {Docsclisummaryelixirelixirmessagequeue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirmessagequeue6 = /** @type {((inputs?: Docsclisummaryelixirelixirmessagequeue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirmessagequeue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirmessagequeue6(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirmessagequeue6(inputs)
	return en_docsclisummaryelixirelixirmessagequeue6(inputs)
});
export { docsclisummaryelixirelixirmessagequeue6 as "docsCliSummaryElixirElixirMessageQueue" }