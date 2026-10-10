/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuistatemanagement6Inputs */

const en_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client state manager.`)
};

const es_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestor de estado del cliente.`)
};

const zh_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`客户端状态管理。`)
};

const ja_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クライアントの状態管理。`)
};

const ko_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`클라이언트 상태 관리자.`)
};

const zh_hant1_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用戶端狀態管理。`)
};

const de_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clientseitige Zustandsverwaltung.`)
};

const fr_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestionnaire d’état côté client.`)
};

const uk_docsclisummarytypescriptuistatemanagement6 = /** @type {(inputs: Docsclisummarytypescriptuistatemanagement6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Менеджер стану клієнта.`)
};

/**
* | output |
* | --- |
* | "Client state manager." |
*
* @param {Docsclisummarytypescriptuistatemanagement6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuistatemanagement6 = /** @type {((inputs?: Docsclisummarytypescriptuistatemanagement6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuistatemanagement6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuistatemanagement6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuistatemanagement6(inputs)
	return en_docsclisummarytypescriptuistatemanagement6(inputs)
});
export { docsclisummarytypescriptuistatemanagement6 as "docsCliSummaryTypescriptUiStateManagement" }