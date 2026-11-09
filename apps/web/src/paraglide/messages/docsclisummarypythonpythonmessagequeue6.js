/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonmessagequeue6Inputs */



/**
* | output |
* | --- |
* | "Python message queue client." |
*
* @param {Docsclisummarypythonpythonmessagequeue6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonmessagequeue6 = /** @type {((inputs?: Docsclisummarypythonpythonmessagequeue6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonmessagequeue6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cliente de cola de mensajes Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 消息队列客户端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のメッセージキュークライアント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 메시지 큐 클라이언트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 訊息佇列用戶端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Client für Nachrichtenwarteschlangen in Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Client de file d’attente de messages Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Клієнт черги повідомлень для Python.")
	return /** @type {LocalizedString} */ ("Python message queue client.")
});
export { docsclisummarypythonpythonmessagequeue6 as "docsCliSummaryPythonPythonMessageQueue" }