/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncli5Inputs */



/**
* | output |
* | --- |
* | "Python CLI tooling." |
*
* @param {Docsclisummarypythonpythoncli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythoncli5 = /** @type {((inputs?: Docsclisummarypythonpythoncli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythoncli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas CLI Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python CLI 工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の CLI ツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python CLI 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python CLI 工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("CLI-Werkzeuge für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils CLI Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструменти CLI для Python.")
	return /** @type {LocalizedString} */ ("Python CLI tooling.")
});
export { docsclisummarypythonpythoncli5 as "docsCliSummaryPythonPythonCli" }