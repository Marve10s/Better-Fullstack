/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionautomate2Inputs */



/**
* | output |
* | --- |
* | "Automate" |
*
* @param {Docssectionautomate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionautomate2 = /** @type {((inputs?: Docssectionautomate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionautomate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Automatizar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("自动化")
	if (locale === "ja") return /** @type {LocalizedString} */ ("自動化")
	if (locale === "ko") return /** @type {LocalizedString} */ ("자동화")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("自動化")
	if (locale === "de") return /** @type {LocalizedString} */ ("Automatisieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Automatiser")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автоматизація")
	return /** @type {LocalizedString} */ ("Automate")
});
export { docssectionautomate2 as "docsSectionAutomate" }