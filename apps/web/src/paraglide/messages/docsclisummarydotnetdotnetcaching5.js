/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetcaching5Inputs */

const en_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET caching.`)
};

const es_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caché en .NET.`)
};

const zh_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 缓存。`)
};

const ja_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のキャッシュ。`)
};

const ko_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 캐싱.`)
};

const zh_hant1_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 快取。`)
};

const de_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caching für .NET.`)
};

const fr_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise en cache .NET.`)
};

const uk_docsclisummarydotnetdotnetcaching5 = /** @type {(inputs: Docsclisummarydotnetdotnetcaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кешування в .NET.`)
};

/**
* | output |
* | --- |
* | ".NET caching." |
*
* @param {Docsclisummarydotnetdotnetcaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetcaching5 = /** @type {((inputs?: Docsclisummarydotnetdotnetcaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetcaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetcaching5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetcaching5(inputs)
	return en_docsclisummarydotnetdotnetcaching5(inputs)
});
export { docsclisummarydotnetdotnetcaching5 as "docsCliSummaryDotnetDotnetCaching" }