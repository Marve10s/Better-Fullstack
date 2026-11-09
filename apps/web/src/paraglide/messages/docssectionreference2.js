/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionreference2Inputs */



/**
* | output |
* | --- |
* | "Reference" |
*
* @param {Docssectionreference2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionreference2 = /** @type {((inputs?: Docssectionreference2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionreference2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Referencia")
	if (locale === "zh") return /** @type {LocalizedString} */ ("参考")
	if (locale === "ja") return /** @type {LocalizedString} */ ("参照")
	if (locale === "ko") return /** @type {LocalizedString} */ ("참조")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("參考")
	if (locale === "de") return /** @type {LocalizedString} */ ("Referenz")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Référence")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Довідник")
	return /** @type {LocalizedString} */ ("Reference")
});
export { docssectionreference2 as "docsSectionReference" }