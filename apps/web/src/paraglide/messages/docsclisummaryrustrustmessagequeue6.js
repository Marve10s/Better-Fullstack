/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustmessagequeue6Inputs */



/**
* | output |
* | --- |
* | "Rust message queue." |
*
* @param {Docsclisummaryrustrustmessagequeue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustmessagequeue6 = /** @type {((inputs?: Docsclisummaryrustrustmessagequeue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustmessagequeue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cola de mensajes en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 消息队列。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のメッセージキュー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 메시지 큐.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 訊息佇列。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nachrichtenwarteschlange für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("File d’attente de messages Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Черга повідомлень для Rust.")
	return /** @type {LocalizedString} */ ("Rust message queue.")
});
export { docsclisummaryrustrustmessagequeue6 as "docsCliSummaryRustRustMessageQueue" }