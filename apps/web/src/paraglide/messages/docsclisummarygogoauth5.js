/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoauth5Inputs */

const en_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go-native auth helpers.`)
};

const es_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas auxiliares de autenticación nativas de Go.`)
};

const zh_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 原生认证辅助工具。`)
};

const ja_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go ネイティブの認証ヘルパー。`)
};

const ko_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 네이티브 인증 헬퍼.`)
};

const zh_hant1_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 原生驗證輔助工具。`)
};

const de_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Native Go-Hilfsbibliotheken zur Authentifizierung.`)
};

const fr_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques natives Go d’aide à l’authentification.`)
};

const uk_docsclisummarygogoauth5 = /** @type {(inputs: Docsclisummarygogoauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Нативні допоміжні бібліотеки Go для автентифікації.`)
};

/**
* | output |
* | --- |
* | "Go-native auth helpers." |
*
* @param {Docsclisummarygogoauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoauth5 = /** @type {((inputs?: Docsclisummarygogoauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogoauth5(inputs)
	if (locale === "zh") return zh_docsclisummarygogoauth5(inputs)
	if (locale === "ja") return ja_docsclisummarygogoauth5(inputs)
	if (locale === "ko") return ko_docsclisummarygogoauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogoauth5(inputs)
	if (locale === "de") return de_docsclisummarygogoauth5(inputs)
	if (locale === "fr") return fr_docsclisummarygogoauth5(inputs)
	if (locale === "uk") return uk_docsclisummarygogoauth5(inputs)
	return en_docsclisummarygogoauth5(inputs)
});
export { docsclisummarygogoauth5 as "docsCliSummaryGoGoAuth" }