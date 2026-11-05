/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubytesting5Inputs */

const en_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby test framework.`)
};

const es_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework de pruebas de Ruby.`)
};

const zh_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 测试框架。`)
};

const ja_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のテストフレームワーク。`)
};

const ko_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 테스트 프레임워크.`)
};

const zh_hant1_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 測試框架。`)
};

const de_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Testframework.`)
};

const fr_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework de test Ruby.`)
};

const uk_docsclisummaryrubyrubytesting5 = /** @type {(inputs: Docsclisummaryrubyrubytesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фреймворк тестування Ruby.`)
};

/**
* | output |
* | --- |
* | "Ruby test framework." |
*
* @param {Docsclisummaryrubyrubytesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubytesting5 = /** @type {((inputs?: Docsclisummaryrubyrubytesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubytesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubytesting5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubytesting5(inputs)
	return en_docsclisummaryrubyrubytesting5(inputs)
});
export { docsclisummaryrubyrubytesting5 as "docsCliSummaryRubyRubyTesting" }