/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapiname4Inputs */



/**
* | output |
* | --- |
* | "Java API" |
*
* @param {Presettrackjavaapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiname4 = /** @type {((inputs?: Presettrackjavaapiname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("API Java")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "de") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Java API")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Java API")
	return /** @type {LocalizedString} */ ("Java API")
});
export { presettrackjavaapiname4 as "presetTrackJavaApiName" }