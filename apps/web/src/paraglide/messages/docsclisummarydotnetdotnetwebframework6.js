/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetwebframework6Inputs */

const en_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET web framework.`)
};

const es_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web .NET.`)
};

const zh_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET Web 框架。`)
};

const ja_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET の Web フレームワーク。`)
};

const ko_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 웹 프레임워크.`)
};

const zh_hant1_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET Web 框架。`)
};

const de_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für .NET.`)
};

const fr_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web .NET.`)
};

const uk_docsclisummarydotnetdotnetwebframework6 = /** @type {(inputs: Docsclisummarydotnetdotnetwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк .NET.`)
};

/**
* | output |
* | --- |
* | ".NET web framework." |
*
* @param {Docsclisummarydotnetdotnetwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetwebframework6 = /** @type {((inputs?: Docsclisummarydotnetdotnetwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetwebframework6(inputs)
	return en_docsclisummarydotnetdotnetwebframework6(inputs)
});
export { docsclisummarydotnetdotnetwebframework6 as "docsCliSummaryDotnetDotnetWebFramework" }