/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetryenabled2Inputs */

const en_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser analytics are enabled.`)
};

const es_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La analítica del navegador está activada.`)
};

const zh_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`浏览器分析已开启。`)
};

const ja_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザ分析は有効です。`)
};

const ko_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`브라우저 분석이 켜져 있습니다.`)
};

const zh_hant1_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`瀏覽器分析已啟用。`)
};

const de_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen sind aktiviert.`)
};

const fr_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les analyses du navigateur sont activées.`)
};

const uk_docstelemetryenabled2 = /** @type {(inputs: Docstelemetryenabled2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Аналітику браузера ввімкнено.`)
};

/**
* | output |
* | --- |
* | "Browser analytics are enabled." |
*
* @param {Docstelemetryenabled2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetryenabled2 = /** @type {((inputs?: Docstelemetryenabled2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetryenabled2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetryenabled2(inputs)
	if (locale === "zh") return zh_docstelemetryenabled2(inputs)
	if (locale === "ja") return ja_docstelemetryenabled2(inputs)
	if (locale === "ko") return ko_docstelemetryenabled2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetryenabled2(inputs)
	if (locale === "de") return de_docstelemetryenabled2(inputs)
	if (locale === "fr") return fr_docstelemetryenabled2(inputs)
	if (locale === "uk") return uk_docstelemetryenabled2(inputs)
	return en_docstelemetryenabled2(inputs)
});
export { docstelemetryenabled2 as "docsTelemetryEnabled" }