/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernone1Inputs */



/**
* | output |
* | --- |
* | "None" |
*
* @param {Buildernone1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernone1 = /** @type {((inputs?: Buildernone1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernone1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ninguno")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无")
	if (locale === "ja") return /** @type {LocalizedString} */ ("なし")
	if (locale === "ko") return /** @type {LocalizedString} */ ("없음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無")
	if (locale === "de") return /** @type {LocalizedString} */ ("Keiner")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucun")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Жодного")
	return /** @type {LocalizedString} */ ("None")
});
export { buildernone1 as "builderNone" }