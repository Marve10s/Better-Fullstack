/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcompare1Inputs */



/**
* | output |
* | --- |
* | "Compare" |
*
* @param {Navcompare1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcompare1 = /** @type {((inputs?: Navcompare1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcompare1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comparar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("比较")
	if (locale === "ja") return /** @type {LocalizedString} */ ("比較")
	if (locale === "ko") return /** @type {LocalizedString} */ ("비교")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("比較")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vergleichen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Comparer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Порівняння")
	return /** @type {LocalizedString} */ ("Compare")
});
export { navcompare1 as "navCompare" }