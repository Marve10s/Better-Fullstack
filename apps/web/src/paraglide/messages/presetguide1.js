/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetguide1Inputs */



/**
* | output |
* | --- |
* | "Guide" |
*
* @param {Presetguide1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetguide1 = /** @type {((inputs?: Presetguide1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetguide1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guía")
	if (locale === "zh") return /** @type {LocalizedString} */ ("指南")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ガイド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("가이드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("指南")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anleitung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Guide")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Гайд")
	return /** @type {LocalizedString} */ ("Guide")
});
export { presetguide1 as "presetGuide" }