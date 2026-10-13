/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonmessagequeue6Inputs */

const en_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python message queue client.`)
};

const es_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente de cola de mensajes Python.`)
};

const zh_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 消息队列客户端。`)
};

const ja_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のメッセージキュークライアント。`)
};

const ko_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 메시지 큐 클라이언트.`)
};

const zh_hant1_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 訊息佇列用戶端。`)
};

const de_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client für Nachrichtenwarteschlangen in Python.`)
};

const fr_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client de file d’attente de messages Python.`)
};

const uk_docsclisummarypythonpythonmessagequeue6 = /** @type {(inputs: Docsclisummarypythonpythonmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Клієнт черги повідомлень для Python.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonmessagequeue6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonmessagequeue6(inputs)
	return en_docsclisummarypythonpythonmessagequeue6(inputs)
});
export { docsclisummarypythonpythonmessagequeue6 as "docsCliSummaryPythonPythonMessageQueue" }