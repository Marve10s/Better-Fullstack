/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryglobalprivacycontrol4Inputs */

const en_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser analytics are disabled because Global Privacy Control is enabled.`)
};

const es_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La analítica del navegador está desactivada porque Global Privacy Control está activado.`)
};

const zh_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由于已开启 Global Privacy Control，浏览器分析已关闭。`)
};

const ja_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Global Privacy Control が有効なため、ブラウザ分析は無効です。`)
};

const ko_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Global Privacy Control이 켜져 있어 브라우저 분석이 꺼져 있습니다.`)
};

const zh_hant1_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由於已啟用 Global Privacy Control，瀏覽器分析已停用。`)
};

const de_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen sind deaktiviert, weil Global Privacy Control aktiviert ist.`)
};

const fr_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les analyses du navigateur sont désactivées car Global Privacy Control est activé.`)
};

const uk_docstelemetryglobalprivacycontrol4 = /** @type {(inputs: Docstelemetryglobalprivacycontrol4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Аналітику браузера вимкнено, бо ввімкнено Global Privacy Control.`)
};

/**
* | output |
* | --- |
* | "Browser analytics are disabled because Global Privacy Control is enabled." |
*
* @param {Docstelemetryglobalprivacycontrol4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryglobalprivacycontrol4 = /** @type {((inputs?: Docstelemetryglobalprivacycontrol4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryglobalprivacycontrol4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "zh") return zh_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "ja") return ja_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "ko") return ko_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "de") return de_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "fr") return fr_docstelemetryglobalprivacycontrol4(inputs)
	if (locale === "uk") return uk_docstelemetryglobalprivacycontrol4(inputs)
	return en_docstelemetryglobalprivacycontrol4(inputs)
});
export { docstelemetryglobalprivacycontrol4 as "docsTelemetryGlobalPrivacyControl" }