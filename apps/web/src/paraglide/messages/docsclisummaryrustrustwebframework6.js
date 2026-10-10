/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustwebframework6Inputs */

const en_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust web framework.`)
};

const es_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Rust.`)
};

const zh_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust Web 框架。`)
};

const ja_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust の Web フレームワーク。`)
};

const ko_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 웹 프레임워크.`)
};

const zh_hant1_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust Web 框架。`)
};

const de_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für Rust.`)
};

const fr_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Rust.`)
};

const uk_docsclisummaryrustrustwebframework6 = /** @type {(inputs: Docsclisummaryrustrustwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк Rust.`)
};

/**
* | output |
* | --- |
* | "Rust web framework." |
*
* @param {Docsclisummaryrustrustwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrustwebframework6 = /** @type {((inputs?: Docsclisummaryrustrustwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrustwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "de") return de_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustwebframework6(inputs)
	return en_docsclisummaryrustrustwebframework6(inputs)
});
export { docsclisummaryrustrustwebframework6 as "docsCliSummaryRustRustWebFramework" }