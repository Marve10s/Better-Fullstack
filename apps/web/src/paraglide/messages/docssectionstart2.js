/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionstart2Inputs */



/**
* | output |
* | --- |
* | "Start" |
*
* @param {Docssectionstart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionstart2 = /** @type {((inputs?: Docssectionstart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionstart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Empezar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("开始")
	if (locale === "ja") return /** @type {LocalizedString} */ ("はじめる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("시작")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開始")
	if (locale === "de") return /** @type {LocalizedString} */ ("Start")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Démarrer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Початок")
	return /** @type {LocalizedString} */ ("Start")
});
export { docssectionstart2 as "docsSectionStart" }