/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparerustbackends2Inputs */



/**
* | output |
* | --- |
* | "Rust backends (Axum, Actix, Rocket)" |
*
* @param {Comparerustbackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparerustbackends2 = /** @type {((inputs?: Comparerustbackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparerustbackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Backends Rust (Axum, Actix, Rocket)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Rust 后端（Axum、Actix、Rocket）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Rust バックエンド (Axum、Actix、Rocket)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Rust 백엔드(Axum, Actix, Rocket)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Rust 後端（Axum、Actix、Rocket）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Rust-Backends (Axum, Actix, Rocket)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Backends Rust (Axum, Actix, Rocket)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Rust-бекенди (Axum, Actix, Rocket)")
	return /** @type {LocalizedString} */ ("Rust backends (Axum, Actix, Rocket)")
});
export { comparerustbackends2 as "compareRustBackends" }