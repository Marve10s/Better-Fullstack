/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationrelease2Inputs */



/**
* | output |
* | --- |
* | "Release" |
*
* @param {Docsverificationrelease2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationrelease2 = /** @type {((inputs?: Docsverificationrelease2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationrelease2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Versión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("发布版本")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リリース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("릴리스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("發行版本")
	if (locale === "de") return /** @type {LocalizedString} */ ("Release")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Version")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Реліз")
	return /** @type {LocalizedString} */ ("Release")
});
export { docsverificationrelease2 as "docsVerificationRelease" }