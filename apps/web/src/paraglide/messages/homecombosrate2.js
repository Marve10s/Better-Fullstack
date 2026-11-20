/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosrate2Inputs */



/**
* | output |
* | --- |
* | "Say each one takes 1 millisecond." |
*
* @param {Homecombosrate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosrate2 = /** @type {((inputs?: Homecombosrate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosrate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Supón que cada uno tarda 1 milisegundo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("假设每个只需 1 毫秒。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("1つにつき1ミリ秒かかるとします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("하나에 1밀리초가 걸린다고 해 봅시다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("假設每個只需 1 毫秒。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Angenommen, jeder braucht 1 Millisekunde.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Disons que chacun prend 1 milliseconde.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Припустімо, кожен займає 1 мілісекунду.")
	return /** @type {LocalizedString} */ ("Say each one takes 1 millisecond.")
});
export { homecombosrate2 as "homeCombosRate" }