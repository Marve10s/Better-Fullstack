/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubywebframework6Inputs */

const en_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP framework.`)
};

const es_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP de Ruby.`)
};

const zh_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 框架。`)
};

const ja_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby の HTTP フレームワーク。`)
};

const ko_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 프레임워크.`)
};

const zh_hant1_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 框架。`)
};

const de_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-HTTP-Framework.`)
};

const fr_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP Ruby.`)
};

const uk_docsclisummaryrubyrubywebframework6 = /** @type {(inputs: Docsclisummaryrubyrubywebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-фреймворк Ruby.`)
};

/**
* | output |
* | --- |
* | "Ruby HTTP framework." |
*
* @param {Docsclisummaryrubyrubywebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubywebframework6 = /** @type {((inputs?: Docsclisummaryrubyrubywebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubywebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubywebframework6(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubywebframework6(inputs)
	return en_docsclisummaryrubyrubywebframework6(inputs)
});
export { docsclisummaryrubyrubywebframework6 as "docsCliSummaryRubyRubyWebFramework" }