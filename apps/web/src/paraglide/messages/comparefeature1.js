/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparefeature1Inputs */



/**
* | output |
* | --- |
* | "Feature" |
*
* @param {Comparefeature1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparefeature1 = /** @type {((inputs?: Comparefeature1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparefeature1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Función")
	if (locale === "zh") return /** @type {LocalizedString} */ ("功能")
	if (locale === "ja") return /** @type {LocalizedString} */ ("機能")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기능")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("功能")
	if (locale === "de") return /** @type {LocalizedString} */ ("Funktion")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fonctionnalité")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Можливість")
	return /** @type {LocalizedString} */ ("Feature")
});
export { comparefeature1 as "compareFeature" }