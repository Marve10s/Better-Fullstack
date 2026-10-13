/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuitesting5Inputs */

const en_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testing setup.`)
};

const es_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración de pruebas.`)
};

const zh_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`测试配置。`)
};

const ja_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テストのセットアップ。`)
};

const ko_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트 설정.`)
};

const zh_hant1_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`測試設定。`)
};

const de_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testeinrichtung.`)
};

const fr_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration des tests.`)
};

const uk_docsclisummarytypescriptuitesting5 = /** @type {(inputs: Docsclisummarytypescriptuitesting5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування тестування.`)
};

/**
* | output |
* | --- |
* | "Testing setup." |
*
* @param {Docsclisummarytypescriptuitesting5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuitesting5 = /** @type {((inputs?: Docsclisummarytypescriptuitesting5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuitesting5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuitesting5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuitesting5(inputs)
	return en_docsclisummarytypescriptuitesting5(inputs)
});
export { docsclisummarytypescriptuitesting5 as "docsCliSummaryTypescriptUiTesting" }