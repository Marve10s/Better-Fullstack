/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoconfig5Inputs */

const en_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go config loader.`)
};

const es_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargador de configuración Go.`)
};

const zh_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 配置加载器。`)
};

const ja_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の設定ローダー。`)
};

const ko_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 설정 로더.`)
};

const zh_hant1_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 設定載入器。`)
};

const de_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Konfigurationslader für Go.`)
};

const fr_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chargeur de configuration Go.`)
};

const uk_docsclisummarygogoconfig5 = /** @type {(inputs: Docsclisummarygogoconfig5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Завантажувач конфігурації Go.`)
};

/**
* | output |
* | --- |
* | "Go config loader." |
*
* @param {Docsclisummarygogoconfig5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoconfig5 = /** @type {((inputs?: Docsclisummarygogoconfig5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoconfig5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoconfig5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoconfig5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoconfig5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoconfig5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoconfig5(inputs)
	if (locale === "de") return de_docsclisummarygogoconfig5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoconfig5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoconfig5(inputs)
	return en_docsclisummarygogoconfig5(inputs)
});
export { docsclisummarygogoconfig5 as "docsCliSummaryGoGoConfig" }