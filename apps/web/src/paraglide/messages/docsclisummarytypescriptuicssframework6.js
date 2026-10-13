/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuicssframework6Inputs */

const en_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS framework.`)
};

const es_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework CSS.`)
};

const zh_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS 框架。`)
};

const ja_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS フレームワーク。`)
};

const ko_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS 프레임워크.`)
};

const zh_hant1_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS 框架。`)
};

const de_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS-Framework.`)
};

const fr_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework CSS.`)
};

const uk_docsclisummarytypescriptuicssframework6 = /** @type {(inputs: Docsclisummarytypescriptuicssframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CSS-фреймворк.`)
};

/**
* | output |
* | --- |
* | "CSS framework." |
*
* @param {Docsclisummarytypescriptuicssframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuicssframework6 = /** @type {((inputs?: Docsclisummarytypescriptuicssframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuicssframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuicssframework6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuicssframework6(inputs)
	return en_docsclisummarytypescriptuicssframework6(inputs)
});
export { docsclisummarytypescriptuicssframework6 as "docsCliSummaryTypescriptUiCssFramework" }