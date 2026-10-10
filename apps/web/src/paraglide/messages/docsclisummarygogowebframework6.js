/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogowebframework6Inputs */

const en_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go web framework.`)
};

const es_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Go.`)
};

const zh_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go Web 框架。`)
};

const ja_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go の Web フレームワーク。`)
};

const ko_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 웹 프레임워크.`)
};

const zh_hant1_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go Web 框架。`)
};

const de_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für Go.`)
};

const fr_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Go.`)
};

const uk_docsclisummarygogowebframework6 = /** @type {(inputs: Docsclisummarygogowebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк Go.`)
};

/**
* | output |
* | --- |
* | "Go web framework." |
*
* @param {Docsclisummarygogowebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogowebframework6 = /** @type {((inputs?: Docsclisummarygogowebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogowebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogowebframework6(inputs)
	if (locale === "zh") return zh_docsclisummarygogowebframework6(inputs)
	if (locale === "ja") return ja_docsclisummarygogowebframework6(inputs)
	if (locale === "ko") return ko_docsclisummarygogowebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogowebframework6(inputs)
	if (locale === "de") return de_docsclisummarygogowebframework6(inputs)
	if (locale === "fr") return fr_docsclisummarygogowebframework6(inputs)
	if (locale === "uk") return uk_docsclisummarygogowebframework6(inputs)
	return en_docsclisummarygogowebframework6(inputs)
});
export { docsclisummarygogowebframework6 as "docsCliSummaryGoGoWebFramework" }