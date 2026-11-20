/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernewbadge2Inputs */



/**
* | output |
* | --- |
* | "New" |
*
* @param {Buildernewbadge2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewbadge2 = /** @type {((inputs?: Buildernewbadge2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewbadge2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Nuevo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("New")
	if (locale === "ko") return /** @type {LocalizedString} */ ("New")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neu")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Nouveau")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Нове")
	return /** @type {LocalizedString} */ ("New")
});
export { buildernewbadge2 as "builderNewBadge" }