/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowtitlea3Inputs */



/**
* | output |
* | --- |
* | "You describe." |
*
* @param {Mcpworkflowtitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowtitlea3 = /** @type {((inputs?: Mcpworkflowtitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowtitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tú describes.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你来描述。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("あなたは説明します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("설명만 하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你來描述。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sie beschreiben.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Vous décrivez.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ви описуєте.")
	return /** @type {LocalizedString} */ ("You describe.")
});
export { mcpworkflowtitlea3 as "mcpWorkflowTitleA" }