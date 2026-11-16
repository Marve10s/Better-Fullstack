/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosquestion2Inputs */



/**
* | output |
* | --- |
* | "How many stacks?" |
*
* @param {Homecombosquestion2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosquestion2 = /** @type {((inputs?: Homecombosquestion2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosquestion2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Cuántos stacks?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("有多少种技术栈？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックは何通り？")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택은 몇 가지?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("有多少種技術棧？")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wie viele Stacks?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Combien de stacks ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скільки стеків?")
	return /** @type {LocalizedString} */ ("How many stacks?")
});
export { homecombosquestion2 as "homeCombosQuestion" }