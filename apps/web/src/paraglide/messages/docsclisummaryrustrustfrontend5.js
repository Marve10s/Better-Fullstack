/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustfrontend5Inputs */



/**
* | output |
* | --- |
* | "WASM frontend." |
*
* @param {Docsclisummaryrustrustfrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustfrontend5 = /** @type {((inputs?: Docsclisummaryrustrustfrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustfrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Frontend WASM.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("WASM 前端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("WASM フロントエンド。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("WASM 프런트엔드.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("WASM 前端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("WASM-Frontend.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frontend WASM.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фронтенд WASM.")
	return /** @type {LocalizedString} */ ("WASM frontend.")
});
export { docsclisummaryrustrustfrontend5 as "docsCliSummaryRustRustFrontend" }