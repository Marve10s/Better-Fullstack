/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrylocaloptout4Inputs */

const en_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser analytics are disabled for this browser.`)
};

const es_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La analítica del navegador está desactivada en este navegador.`)
};

const zh_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此浏览器已关闭浏览器分析。`)
};

const ja_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このブラウザではブラウザ分析が無効です。`)
};

const ko_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 브라우저에서는 브라우저 분석이 꺼져 있습니다.`)
};

const zh_hant1_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此瀏覽器已停用瀏覽器分析。`)
};

const de_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen sind für diesen Browser deaktiviert.`)
};

const fr_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les analyses du navigateur sont désactivées pour ce navigateur.`)
};

const uk_docstelemetrylocaloptout4 = /** @type {(inputs: Docstelemetrylocaloptout4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Аналітику браузера вимкнено для цього браузера.`)
};

/**
* | output |
* | --- |
* | "Browser analytics are disabled for this browser." |
*
* @param {Docstelemetrylocaloptout4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetrylocaloptout4 = /** @type {((inputs?: Docstelemetrylocaloptout4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetrylocaloptout4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetrylocaloptout4(inputs)
	if (locale === "zh") return zh_docstelemetrylocaloptout4(inputs)
	if (locale === "ja") return ja_docstelemetrylocaloptout4(inputs)
	if (locale === "ko") return ko_docstelemetrylocaloptout4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetrylocaloptout4(inputs)
	if (locale === "de") return de_docstelemetrylocaloptout4(inputs)
	if (locale === "fr") return fr_docstelemetrylocaloptout4(inputs)
	if (locale === "uk") return uk_docstelemetrylocaloptout4(inputs)
	return en_docstelemetrylocaloptout4(inputs)
});
export { docstelemetrylocaloptout4 as "docsTelemetryLocalOptOut" }