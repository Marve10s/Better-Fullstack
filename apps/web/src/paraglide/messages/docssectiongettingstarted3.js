/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectiongettingstarted3Inputs */



/**
* | output |
* | --- |
* | "Getting Started" |
*
* @param {Docssectiongettingstarted3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectiongettingstarted3 = /** @type {((inputs?: Docssectiongettingstarted3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectiongettingstarted3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Primeros pasos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("入门")
	if (locale === "ja") return /** @type {LocalizedString} */ ("はじめる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("시작하기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("入門")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erste Schritte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commencer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Початок роботи")
	return /** @type {LocalizedString} */ ("Getting Started")
});
export { docssectiongettingstarted3 as "docsSectionGettingStarted" }