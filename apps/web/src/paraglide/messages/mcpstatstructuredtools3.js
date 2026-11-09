/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatstructuredtools3Inputs */



/**
* | output |
* | --- |
* | "structured tools" |
*
* @param {Mcpstatstructuredtools3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatstructuredtools3 = /** @type {((inputs?: Mcpstatstructuredtools3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatstructuredtools3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("herramientas estructuradas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("结构化工具")
	if (locale === "ja") return /** @type {LocalizedString} */ ("構造化されたツール")
	if (locale === "ko") return /** @type {LocalizedString} */ ("구조화된 도구")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("結構化工具")
	if (locale === "de") return /** @type {LocalizedString} */ ("strukturierte Werkzeuge")
	if (locale === "fr") return /** @type {LocalizedString} */ ("outils structurés")
	if (locale === "uk") return /** @type {LocalizedString} */ ("структуровані інструменти")
	return /** @type {LocalizedString} */ ("structured tools")
});
export { mcpstatstructuredtools3 as "mcpStatStructuredTools" }