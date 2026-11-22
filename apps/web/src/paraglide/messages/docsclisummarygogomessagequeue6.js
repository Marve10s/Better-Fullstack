/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogomessagequeue6Inputs */



/**
* | output |
* | --- |
* | "Go message queue." |
*
* @param {Docsclisummarygogomessagequeue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogomessagequeue6 = /** @type {((inputs?: Docsclisummarygogomessagequeue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogomessagequeue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cola de mensajes en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 消息队列。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のメッセージキュー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 메시지 큐.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 訊息佇列。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nachrichtenwarteschlange für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("File d’attente de messages Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Черга повідомлень для Go.")
	return /** @type {LocalizedString} */ ("Go message queue.")
});
export { docsclisummarygogomessagequeue6 as "docsCliSummaryGoGoMessageQueue" }