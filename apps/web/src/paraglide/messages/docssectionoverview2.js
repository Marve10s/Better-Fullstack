/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionoverview2Inputs */



/**
* | output |
* | --- |
* | "Overview" |
*
* @param {Docssectionoverview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionoverview2 = /** @type {((inputs?: Docssectionoverview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionoverview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Resumen")
	if (locale === "zh") return /** @type {LocalizedString} */ ("概览")
	if (locale === "ja") return /** @type {LocalizedString} */ ("概要")
	if (locale === "ko") return /** @type {LocalizedString} */ ("개요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("概覽")
	if (locale === "de") return /** @type {LocalizedString} */ ("Überblick")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aperçu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Огляд")
	return /** @type {LocalizedString} */ ("Overview")
});
export { docssectionoverview2 as "docsSectionOverview" }