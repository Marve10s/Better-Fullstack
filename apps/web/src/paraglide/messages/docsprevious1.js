/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsprevious1Inputs */



/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Docsprevious1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsprevious1 = /** @type {((inputs?: Docsprevious1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsprevious1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Anterior")
	if (locale === "zh") return /** @type {LocalizedString} */ ("上一页")
	if (locale === "ja") return /** @type {LocalizedString} */ ("前へ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이전")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("上一頁")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorherige")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Précédent")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Попередній")
	return /** @type {LocalizedString} */ ("Previous")
});
export { docsprevious1 as "docsPrevious" }