/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitlea3Inputs */



/**
* | output |
* | --- |
* | "Seven tools." |
*
* @param {Mcptoolstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolstitlea3 = /** @type {((inputs?: Mcptoolstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Siete herramientas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("七个工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("7つのツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("일곱 가지 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("七個工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sieben Werkzeuge.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sept outils.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сім інструментів.")
	return /** @type {LocalizedString} */ ("Seven tools.")
});
export { mcptoolstitlea3 as "mcpToolsTitleA" }