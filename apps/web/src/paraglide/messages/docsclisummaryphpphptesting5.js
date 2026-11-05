/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphptesting5Inputs */

const en_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP test runner.`)
};

const es_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutor de pruebas de PHP.`)
};

const zh_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 测试运行器。`)
};

const ja_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP のテストランナー。`)
};

const ko_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 테스트 러너.`)
};

const zh_hant1_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 測試執行器。`)
};

const de_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Testrunner.`)
};

const fr_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanceur de tests PHP.`)
};

const uk_docsclisummaryphpphptesting5 = /** @type {(inputs: Docsclisummaryphpphptesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Засіб запуску тестів PHP.`)
};

/**
* | output |
* | --- |
* | "PHP test runner." |
*
* @param {Docsclisummaryphpphptesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphptesting5 = /** @type {((inputs?: Docsclisummaryphpphptesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphptesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphptesting5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphptesting5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphptesting5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphptesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphptesting5(inputs)
	if (locale === "de") return de_docsclisummaryphpphptesting5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphptesting5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphptesting5(inputs)
	return en_docsclisummaryphpphptesting5(inputs)
});
export { docsclisummaryphpphptesting5 as "docsCliSummaryPhpPhpTesting" }