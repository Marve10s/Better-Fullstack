/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryenable2Inputs */

const en_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enable browser analytics`)
};

const es_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Activar la analítica del navegador`)
};

const zh_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开启浏览器分析`)
};

const ja_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザ分析を有効にする`)
};

const ko_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저 분석 켜기`)
};

const zh_hant1_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`啟用瀏覽器分析`)
};

const de_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen aktivieren`)
};

const fr_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Activer les analyses du navigateur`)
};

const uk_docstelemetryenable2 = /** @type {(inputs: Docstelemetryenable2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Увімкнути аналітику браузера`)
};

/**
* | output |
* | --- |
* | "Enable browser analytics" |
*
* @param {Docstelemetryenable2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryenable2 = /** @type {((inputs?: Docstelemetryenable2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryenable2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetryenable2(inputs)
	if (locale === "zh") return zh_docstelemetryenable2(inputs)
	if (locale === "ja") return ja_docstelemetryenable2(inputs)
	if (locale === "ko") return ko_docstelemetryenable2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetryenable2(inputs)
	if (locale === "de") return de_docstelemetryenable2(inputs)
	if (locale === "fr") return fr_docstelemetryenable2(inputs)
	if (locale === "uk") return uk_docstelemetryenable2(inputs)
	return en_docstelemetryenable2(inputs)
});
export { docstelemetryenable2 as "docsTelemetryEnable" }