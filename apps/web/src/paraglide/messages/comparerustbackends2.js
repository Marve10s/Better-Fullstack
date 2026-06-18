/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparerustbackends2Inputs */

const en_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust backends (Axum, Actix, Rocket)`)
};

const es_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Rust (Axum, Actix, Rocket)`)
};

const zh_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 后端（Axum、Actix、Rocket）`)
};

const ja_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust バックエンド (Axum、Actix、Rocket)`)
};

const ko_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 백엔드(Axum, Actix, Rocket)`)
};

const zh_hant1_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 後端（Axum、Actix、Rocket）`)
};

const de_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust-Backends (Axum, Actix, Rocket)`)
};

const fr_comparerustbackends2 = /** @type {(inputs: Comparerustbackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Rust (Axum, Actix, Rocket)`)
};

/**
* | output |
* | --- |
* | "Rust backends (Axum, Actix, Rocket)" |
*
* @param {Comparerustbackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparerustbackends2 = /** @type {((inputs?: Comparerustbackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparerustbackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparerustbackends2(inputs)
	if (locale === "es") return es_comparerustbackends2(inputs)
	if (locale === "zh") return zh_comparerustbackends2(inputs)
	if (locale === "ja") return ja_comparerustbackends2(inputs)
	if (locale === "ko") return ko_comparerustbackends2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparerustbackends2(inputs)
	if (locale === "de") return de_comparerustbackends2(inputs)
	return fr_comparerustbackends2(inputs)
});
export { comparerustbackends2 as "compareRustBackends" }