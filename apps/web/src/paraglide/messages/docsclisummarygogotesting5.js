/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogotesting5Inputs */

const en_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go testing libraries.`)
};

const es_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotecas de pruebas de Go.`)
};

const zh_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 测试库。`)
};

const ja_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のテストライブラリ。`)
};

const ko_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 테스트 라이브러리.`)
};

const zh_hant1_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 測試函式庫。`)
};

const de_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testbibliotheken für Go.`)
};

const fr_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques de tests Go.`)
};

const uk_docsclisummarygogotesting5 = /** @type {(inputs: Docsclisummarygogotesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки тестування Go.`)
};

/**
* | output |
* | --- |
* | "Go testing libraries." |
*
* @param {Docsclisummarygogotesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogotesting5 = /** @type {((inputs?: Docsclisummarygogotesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogotesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogotesting5(inputs)
	if (locale === "zh") return zh_docsclisummarygogotesting5(inputs)
	if (locale === "ja") return ja_docsclisummarygogotesting5(inputs)
	if (locale === "ko") return ko_docsclisummarygogotesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogotesting5(inputs)
	if (locale === "de") return de_docsclisummarygogotesting5(inputs)
	if (locale === "fr") return fr_docsclisummarygogotesting5(inputs)
	if (locale === "uk") return uk_docsclisummarygogotesting5(inputs)
	return en_docsclisummarygogotesting5(inputs)
});
export { docsclisummarygogotesting5 as "docsCliSummaryGoGoTesting" }