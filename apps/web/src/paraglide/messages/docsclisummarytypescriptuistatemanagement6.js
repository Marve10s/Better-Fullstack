/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuistatemanagement6Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Gestor de estado del cliente.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("客户端状态管理。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クライアントの状態管理。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("클라이언트 상태 관리자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("用戶端狀態管理。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Clientseitige Zustandsverwaltung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestionnaire d’état côté client.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Менеджер стану клієнта.")
	return /** @type {LocalizedString} */ ("Client state manager.")
});
export { docsclisummarytypescriptuistatemanagement6 as "docsCliSummaryTypescriptUiStateManagement" }