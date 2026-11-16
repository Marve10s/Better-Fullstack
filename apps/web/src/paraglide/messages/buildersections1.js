/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersections1Inputs */



/**
* | output |
* | --- |
* | "Sections" |
*
* @param {Buildersections1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersections1 = /** @type {((inputs?: Buildersections1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersections1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Secciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分区")
	if (locale === "ja") return /** @type {LocalizedString} */ ("セクション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("섹션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分區")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abschnitte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sections")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Розділи")
	return /** @type {LocalizedString} */ ("Sections")
});
export { buildersections1 as "builderSections" }