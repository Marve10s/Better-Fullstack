/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirmessagequeue6Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente de broker de mensajes para Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 消息代理客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のメッセージブローカークライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 메시지 브로커 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 訊息代理用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Message-Broker-Client für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client de broker de messages Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Клієнт брокера повідомлень для Elixir.")
	return /** @type {LocalizedString} */ ("Elixir message broker client.")
});
export { docsclisummaryelixirelixirmessagequeue6 as "docsCliSummaryElixirElixirMessageQueue" }