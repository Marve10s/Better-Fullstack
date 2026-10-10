/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustcaching5Inputs */

const en_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust caching.`)
};

const es_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caché en Rust.`)
};

const zh_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 缓存。`)
};

const ja_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のキャッシュ。`)
};

const ko_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 캐싱.`)
};

const zh_hant1_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 快取。`)
};

const de_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caching für Rust.`)
};

const fr_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise en cache Rust.`)
};

const uk_docsclisummaryrustrustcaching5 = /** @type {(inputs: Docsclisummaryrustrustcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кешування в Rust.`)
};

/**
* | output |
* | --- |
* | "Rust caching." |
*
* @param {Docsclisummaryrustrustcaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustcaching5 = /** @type {((inputs?: Docsclisummaryrustrustcaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustcaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustcaching5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustcaching5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustcaching5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustcaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustcaching5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustcaching5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustcaching5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustcaching5(inputs)
	return en_docsclisummaryrustrustcaching5(inputs)
});
export { docsclisummaryrustrustcaching5 as "docsCliSummaryRustRustCaching" }