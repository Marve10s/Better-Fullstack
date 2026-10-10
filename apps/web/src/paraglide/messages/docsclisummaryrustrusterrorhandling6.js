/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrustrusterrorhandling6Inputs */

const en_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust error handling.`)
};

const es_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestión de errores en Rust.`)
};

const zh_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 错误处理。`)
};

const ja_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust のエラー処理。`)
};

const ko_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 오류 처리.`)
};

const zh_hant1_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rust 錯誤處理。`)
};

const de_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fehlerbehandlung für Rust.`)
};

const fr_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestion des erreurs Rust.`)
};

const uk_docsclisummaryrustrusterrorhandling6 = /** @type {(inputs: Docsclisummaryrustrusterrorhandling6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Обробка помилок у Rust.`)
};

/**
* | output |
* | --- |
* | "Rust error handling." |
*
* @param {Docsclisummaryrustrusterrorhandling6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrustrusterrorhandling6 = /** @type {((inputs?: Docsclisummaryrustrusterrorhandling6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrustrusterrorhandling6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "zh") return zh_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "ja") return ja_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "ko") return ko_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "de") return de_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "fr") return fr_docsclisummaryrustrusterrorhandling6(inputs)
	if (locale === "uk") return uk_docsclisummaryrustrusterrorhandling6(inputs)
	return en_docsclisummaryrustrusterrorhandling6(inputs)
});
export { docsclisummaryrustrusterrorhandling6 as "docsCliSummaryRustRustErrorHandling" }