/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometotal1Inputs */



/**
* | output |
* | --- |
* | "total" |
*
* @param {Hometotal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometotal1 = /** @type {((inputs?: Hometotal1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotal1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("total")
	if (locale === "zh") return /** @type {LocalizedString} */ ("总计")
	if (locale === "ja") return /** @type {LocalizedString} */ ("合計")
	if (locale === "ko") return /** @type {LocalizedString} */ ("총")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("總計")
	if (locale === "de") return /** @type {LocalizedString} */ ("gesamt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("total")
	if (locale === "uk") return /** @type {LocalizedString} */ ("всього")
	return /** @type {LocalizedString} */ ("total")
});
export { hometotal1 as "homeTotal" }