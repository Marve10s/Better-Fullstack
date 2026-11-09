/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackendname4Inputs */



/**
* | output |
* | --- |
* | "Rust Backend" |
*
* @param {Presettrackrustbackendname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendname4 = /** @type {((inputs?: Presettrackrustbackendname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Backend Rust")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 后端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rustバックエンド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 백엔드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 後端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Rust-Backend")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Back-end Rust")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Rust-бекенд")
	return /** @type {LocalizedString} */ ("Rust Backend")
});
export { presettrackrustbackendname4 as "presetTrackRustBackendName" }