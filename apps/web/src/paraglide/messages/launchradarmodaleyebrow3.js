/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarmodaleyebrow3Inputs */



/**
* | output |
* | --- |
* | "July drop / Development" |
*
* @param {Launchradarmodaleyebrow3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarmodaleyebrow3 = /** @type {((inputs?: Launchradarmodaleyebrow3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarmodaleyebrow3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Drop de julio / Development")
	if (locale === "zh") return /** @type {LocalizedString} */ ("七月上新 / Development")
	if (locale === "ja") return /** @type {LocalizedString} */ ("7月ドロップ / Development")
	if (locale === "ko") return /** @type {LocalizedString} */ ("7월 드롭 / Development")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("七月上新 / Development")
	if (locale === "de") return /** @type {LocalizedString} */ ("Juli-Drop / Development")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Drop de juillet / Development")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Липневий дроп / Development")
	return /** @type {LocalizedString} */ ("July drop / Development")
});
export { launchradarmodaleyebrow3 as "launchRadarModalEyebrow" }