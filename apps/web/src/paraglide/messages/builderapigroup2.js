/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderapigroup2Inputs */



/**
* | output |
* | --- |
* | "{ecosystem} API" |
*
* @param {Builderapigroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderapigroup2 = /** @type {((inputs: Builderapigroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderapigroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`API ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
	return /** @type {LocalizedString} */ (`${i?.ecosystem} API`)
});
export { builderapigroup2 as "builderApiGroup" }