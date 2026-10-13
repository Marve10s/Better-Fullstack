/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustmessagequeue6Inputs */

const en_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust message queue.`)
};

const es_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cola de mensajes en Rust.`)
};

const zh_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 消息队列。`)
};

const ja_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のメッセージキュー。`)
};

const ko_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 메시지 큐.`)
};

const zh_hant1_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 訊息佇列。`)
};

const de_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nachrichtenwarteschlange für Rust.`)
};

const fr_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`File d’attente de messages Rust.`)
};

const uk_docsclisummaryrustrustmessagequeue6 = /** @type {(inputs: Docsclisummaryrustrustmessagequeue6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Черга повідомлень для Rust.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "de") return de_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustmessagequeue6(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustmessagequeue6(inputs)
	return en_docsclisummaryrustrustmessagequeue6(inputs)
});
export { docsclisummaryrustrustmessagequeue6 as "docsCliSummaryRustRustMessageQueue" }