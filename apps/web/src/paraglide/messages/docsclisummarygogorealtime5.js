/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogorealtime5Inputs */



/**
* | output |
* | --- |
* | "Go realtime." |
*
* @param {Docsclisummarygogorealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogorealtime5 = /** @type {((inputs?: Docsclisummarygogorealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogorealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comunicación en tiempo real en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 实时通信。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のリアルタイム通信。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 실시간 통신.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 即時通訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeitkommunikation für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Communication en temps réel Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Комунікація в реальному часі в Go.")
	return /** @type {LocalizedString} */ ("Go realtime.")
});
export { docsclisummarygogorealtime5 as "docsCliSummaryGoGoRealtime" }