/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavawebframework6Inputs */

const en_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java web framework.`)
};

const es_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Java.`)
};

const zh_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java Web 框架。`)
};

const ja_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java の Web フレームワーク。`)
};

const ko_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 웹 프레임워크.`)
};

const zh_hant1_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java Web 框架。`)
};

const de_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für Java.`)
};

const fr_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Java.`)
};

const uk_docsclisummaryjavajavawebframework6 = /** @type {(inputs: Docsclisummaryjavajavawebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк Java.`)
};

/**
* | output |
* | --- |
* | "Java web framework." |
*
* @param {Docsclisummaryjavajavawebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavawebframework6 = /** @type {((inputs?: Docsclisummaryjavajavawebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavawebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "de") return de_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavawebframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavawebframework6(inputs)
	return en_docsclisummaryjavajavawebframework6(inputs)
});
export { docsclisummaryjavajavawebframework6 as "docsCliSummaryJavaJavaWebFramework" }