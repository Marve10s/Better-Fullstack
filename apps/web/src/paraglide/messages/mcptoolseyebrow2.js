/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolseyebrow2Inputs */



/**
* | output |
* | --- |
* | "toolbox" |
*
* @param {Mcptoolseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolseyebrow2 = /** @type {((inputs?: Mcptoolseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("herramientas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("工具箱")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ツールボックス")
	if (locale === "ko") return /** @type {LocalizedString} */ ("도구 상자")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("工具箱")
	if (locale === "de") return /** @type {LocalizedString} */ ("Werkzeugkasten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("boîte à outils")
	if (locale === "uk") return /** @type {LocalizedString} */ ("набір інструментів")
	return /** @type {LocalizedString} */ ("toolbox")
});
export { mcptoolseyebrow2 as "mcpToolsEyebrow" }