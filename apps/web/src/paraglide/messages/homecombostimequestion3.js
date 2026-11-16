/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombostimequestion3Inputs */



/**
* | output |
* | --- |
* | "How long to try them all?" |
*
* @param {Homecombostimequestion3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombostimequestion3 = /** @type {((inputs?: Homecombostimequestion3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombostimequestion3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Cuánto tardarías en probarlos todos?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全部试一遍要多久？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("全部試すのにどれくらい？")
	if (locale === "ko") return /** @type {LocalizedString} */ ("전부 시도하려면 얼마나 걸릴까?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全部試一遍要多久？")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wie lange, um alle zu testen?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Combien de temps pour tous les essayer ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скільки часу, щоб спробувати всі?")
	return /** @type {LocalizedString} */ ("How long to try them all?")
});
export { homecombostimequestion3 as "homeCombosTimeQuestion" }