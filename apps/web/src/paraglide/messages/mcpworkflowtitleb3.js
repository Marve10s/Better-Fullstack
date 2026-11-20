/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitleb3Inputs */



/**
* | output |
* | --- |
* | "It builds." |
*
* @param {Mcpworkflowtitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitleb3 = /** @type {((inputs?: Mcpworkflowtitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Él construye.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("它来构建。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("それは構築されます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드됩니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("它來建構。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Es baut.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cela construit.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Він будує.")
	return /** @type {LocalizedString} */ ("It builds.")
});
export { mcpworkflowtitleb3 as "mcpWorkflowTitleB" }