/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrydisable2Inputs */

const en_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disable browser analytics`)
};

const es_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desactivar la analítica del navegador`)
};

const zh_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭浏览器分析`)
};

const ja_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザ分析を無効にする`)
};

const ko_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저 분석 끄기`)
};

const zh_hant1_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用瀏覽器分析`)
};

const de_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen deaktivieren`)
};

const fr_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Désactiver les analyses du navigateur`)
};

const uk_docstelemetrydisable2 = /** @type {(inputs: Docstelemetrydisable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вимкнути аналітику браузера`)
};

/**
* | output |
* | --- |
* | "Disable browser analytics" |
*
* @param {Docstelemetrydisable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetrydisable2 = /** @type {((inputs?: Docstelemetrydisable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetrydisable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetrydisable2(inputs)
	if (locale === "zh") return zh_docstelemetrydisable2(inputs)
	if (locale === "ja") return ja_docstelemetrydisable2(inputs)
	if (locale === "ko") return ko_docstelemetrydisable2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetrydisable2(inputs)
	if (locale === "de") return de_docstelemetrydisable2(inputs)
	if (locale === "fr") return fr_docstelemetrydisable2(inputs)
	if (locale === "uk") return uk_docstelemetrydisable2(inputs)
	return en_docstelemetrydisable2(inputs)
});
export { docstelemetrydisable2 as "docsTelemetryDisable" }