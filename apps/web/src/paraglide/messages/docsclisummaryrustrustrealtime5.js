/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrustrealtime5Inputs */

const en_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust realtime.`)
};

const es_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comunicación en tiempo real en Rust.`)
};

const zh_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 实时通信。`)
};

const ja_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のリアルタイム通信。`)
};

const ko_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 실시간 통신.`)
};

const zh_hant1_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 即時通訊。`)
};

const de_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeitkommunikation für Rust.`)
};

const fr_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communication en temps réel Rust.`)
};

const uk_docsclisummaryrustrustrealtime5 = /** @type {(inputs: Docsclisummaryrustrustrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Комунікація в реальному часі в Rust.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "de") return de_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrustrealtime5(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrustrealtime5(inputs)
	return en_docsclisummaryrustrustrealtime5(inputs)
});
export { docsclisummaryrustrustrealtime5 as "docsCliSummaryRustRustRealtime" }