/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobiletesting6Inputs */

const en_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile testing setup.`)
};

const es_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración de pruebas móviles.`)
};

const zh_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动端测试配置。`)
};

const ja_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイルのテストセットアップ。`)
};

const ko_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일 테스트 설정.`)
};

const zh_hant1_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動裝置測試設定。`)
};

const de_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testeinrichtung für mobile Apps.`)
};

const fr_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration des tests mobiles.`)
};

const uk_docsclisummaryreactnativemobiletesting6 = /** @type {(inputs: Docsclisummaryreactnativemobiletesting6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування мобільного тестування.`)
};

/**
* | output |
* | --- |
* | "Mobile testing setup." |
*
* @param {Docsclisummaryreactnativemobiletesting6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobiletesting6 = /** @type {((inputs?: Docsclisummaryreactnativemobiletesting6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobiletesting6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobiletesting6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobiletesting6(inputs)
	return en_docsclisummaryreactnativemobiletesting6(inputs)
});
export { docsclisummaryreactnativemobiletesting6 as "docsCliSummaryReactNativeMobileTesting" }