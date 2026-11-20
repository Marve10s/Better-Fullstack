/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliflag2Inputs */



/**
* | output |
* | --- |
* | "Flag" |
*
* @param {Docscliflag2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscliflag2 = /** @type {((inputs?: Docscliflag2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscliflag2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Flag")
	if (locale === "zh") return /** @type {LocalizedString} */ ("参数")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フラグ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("플래그")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("旗標")
	if (locale === "de") return /** @type {LocalizedString} */ ("Flag")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Option")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Прапорець")
	return /** @type {LocalizedString} */ ("Flag")
});
export { docscliflag2 as "docsCliFlag" }