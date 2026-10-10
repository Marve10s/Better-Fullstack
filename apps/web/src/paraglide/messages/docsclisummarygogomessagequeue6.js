/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogomessagequeue6Inputs */

const en_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go message queue.`)
};

const es_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cola de mensajes en Go.`)
};

const zh_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 消息队列。`)
};

const ja_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のメッセージキュー。`)
};

const ko_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 메시지 큐.`)
};

const zh_hant1_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 訊息佇列。`)
};

const de_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nachrichtenwarteschlange für Go.`)
};

const fr_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File d’attente de messages Go.`)
};

const uk_docsclisummarygogomessagequeue6 = /** @type {(inputs: Docsclisummarygogomessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Черга повідомлень для Go.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogomessagequeue6(inputs)
	if (locale === "zh") return zh_docsclisummarygogomessagequeue6(inputs)
	if (locale === "ja") return ja_docsclisummarygogomessagequeue6(inputs)
	if (locale === "ko") return ko_docsclisummarygogomessagequeue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogomessagequeue6(inputs)
	if (locale === "de") return de_docsclisummarygogomessagequeue6(inputs)
	if (locale === "fr") return fr_docsclisummarygogomessagequeue6(inputs)
	if (locale === "uk") return uk_docsclisummarygogomessagequeue6(inputs)
	return en_docsclisummarygogomessagequeue6(inputs)
});
export { docsclisummarygogomessagequeue6 as "docsCliSummaryGoGoMessageQueue" }