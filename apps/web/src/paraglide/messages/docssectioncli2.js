/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectioncli2Inputs */



/**
* | output |
* | --- |
* | "CLI" |
*
* @param {Docssectioncli2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectioncli2 = /** @type {((inputs?: Docssectioncli2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectioncli2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "zh") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "ja") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "ko") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "de") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "fr") return /** @type {LocalizedString} */ ("CLI")
	if (locale === "uk") return /** @type {LocalizedString} */ ("CLI")
	return /** @type {LocalizedString} */ ("CLI")
});
export { docssectioncli2 as "docsSectionCli" }