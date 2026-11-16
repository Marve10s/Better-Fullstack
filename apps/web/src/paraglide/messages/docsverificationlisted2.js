/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationlisted2Inputs */



/**
* | output |
* | --- |
* | "Listed" |
*
* @param {Docsverificationlisted2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationlisted2 = /** @type {((inputs?: Docsverificationlisted2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationlisted2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Listado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已列出")
	if (locale === "ja") return /** @type {LocalizedString} */ ("記載済み")
	if (locale === "ko") return /** @type {LocalizedString} */ ("목록에 포함")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已列出")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aufgeführt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Répertorié")
	if (locale === "uk") return /** @type {LocalizedString} */ ("У списку")
	return /** @type {LocalizedString} */ ("Listed")
});
export { docsverificationlisted2 as "docsVerificationListed" }