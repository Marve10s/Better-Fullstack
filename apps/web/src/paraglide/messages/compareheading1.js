/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareheading1Inputs */



/**
* | output |
* | --- |
* | "How does Better Fullstack compare?" |
*
* @param {Compareheading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareheading1 = /** @type {((inputs?: Compareheading1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareheading1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Cómo se compara Better Fullstack?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Better Fullstack 有什么不同？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Better Fullstack との比較はどうですか?")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Better Fullstack은 어떻게 비교될까요?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Better Fullstack 有什麼不同？")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wie schneidet Better Fullstack im Vergleich ab?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Comment Better Fullstack se compare-t-il ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Як Better Fullstack виглядає поруч з іншими?")
	return /** @type {LocalizedString} */ ("How does Better Fullstack compare?")
});
export { compareheading1 as "compareHeading" }