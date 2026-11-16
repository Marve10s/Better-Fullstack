/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeuniverselifetimes2Inputs */



/**
* | output |
* | --- |
* | "universe lifetimes" |
*
* @param {Homeuniverselifetimes2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeuniverselifetimes2 = /** @type {((inputs?: Homeuniverselifetimes2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeuniverselifetimes2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("vidas del universo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("个宇宙寿命")
	if (locale === "ja") return /** @type {LocalizedString} */ ("宇宙の寿命")
	if (locale === "ko") return /** @type {LocalizedString} */ ("우주 수명")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("個宇宙壽命")
	if (locale === "de") return /** @type {LocalizedString} */ ("Universumslebensdauern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("durées de vie de l'univers")
	if (locale === "uk") return /** @type {LocalizedString} */ ("життів Всесвіту")
	return /** @type {LocalizedString} */ ("universe lifetimes")
});
export { homeuniverselifetimes2 as "homeUniverseLifetimes" }