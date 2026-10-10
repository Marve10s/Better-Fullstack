/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustfrontend5Inputs */

const en_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM frontend.`)
};

const es_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend WASM.`)
};

const zh_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM 前端。`)
};

const ja_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM フロントエンド。`)
};

const ko_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM 프런트엔드.`)
};

const zh_hant1_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM 前端。`)
};

const de_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`WASM-Frontend.`)
};

const fr_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend WASM.`)
};

const uk_docsclisummaryrustrustfrontend5 = /** @type {(inputs: Docsclisummaryrustrustfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фронтенд WASM.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustfrontend5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustfrontend5(inputs)
	return en_docsclisummaryrustrustfrontend5(inputs)
});
export { docsclisummaryrustrustfrontend5 as "docsCliSummaryRustRustFrontend" }