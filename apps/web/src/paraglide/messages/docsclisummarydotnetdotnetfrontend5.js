/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetfrontend5Inputs */

const en_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET frontend.`)
};

const es_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend .NET.`)
};

const zh_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 前端。`)
};

const ja_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のフロントエンド。`)
};

const ko_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 프런트엔드.`)
};

const zh_hant1_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 前端。`)
};

const de_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET-Frontend.`)
};

const fr_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend .NET.`)
};

const uk_docsclisummarydotnetdotnetfrontend5 = /** @type {(inputs: Docsclisummarydotnetdotnetfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фронтенд .NET.`)
};

/**
* | output |
* | --- |
* | ".NET frontend." |
*
* @param {Docsclisummarydotnetdotnetfrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetfrontend5 = /** @type {((inputs?: Docsclisummarydotnetdotnetfrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetfrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetfrontend5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetfrontend5(inputs)
	return en_docsclisummarydotnetdotnetfrontend5(inputs)
});
export { docsclisummarydotnetdotnetfrontend5 as "docsCliSummaryDotnetDotnetFrontend" }