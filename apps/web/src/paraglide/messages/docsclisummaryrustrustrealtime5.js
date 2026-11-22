/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustrealtime5Inputs */



/**
* | output |
* | --- |
* | "Rust realtime." |
*
* @param {Docsclisummaryrustrustrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustrealtime5 = /** @type {((inputs?: Docsclisummaryrustrustrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comunicación en tiempo real en Rust.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 实时通信。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust のリアルタイム通信。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 실시간 통신.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 即時通訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Echtzeitkommunikation für Rust.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Communication en temps réel Rust.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Комунікація в реальному часі в Rust.")
	return /** @type {LocalizedString} */ ("Rust realtime.")
});
export { docsclisummaryrustrustrealtime5 as "docsCliSummaryRustRustRealtime" }