/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesrealtime5Inputs */



/**
* | output |
* | --- |
* | "Realtime transport." |
*
* @param {Docsclisummarytypescriptservicesrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesrealtime5 = /** @type {((inputs?: Docsclisummarytypescriptservicesrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Transporte en tiempo real.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实时传输方案。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リアルタイム通信の方式。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실시간 전송 방식.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("即時傳輸方案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeittransport.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Transport en temps réel.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Транспорт у реальному часі.")
	return /** @type {LocalizedString} */ ("Realtime transport.")
});
export { docsclisummarytypescriptservicesrealtime5 as "docsCliSummaryTypescriptServicesRealtime" }