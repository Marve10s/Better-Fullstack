/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogocli5Inputs */



/**
* | output |
* | --- |
* | "Go CLI tooling." |
*
* @param {Docsclisummarygogocli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogocli5 = /** @type {((inputs?: Docsclisummarygogocli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogocli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas CLI Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go CLI 工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の CLI ツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go CLI 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go CLI 工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("CLI-Werkzeuge für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils CLI Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструменти CLI для Go.")
	return /** @type {LocalizedString} */ ("Go CLI tooling.")
});
export { docsclisummarygogocli5 as "docsCliSummaryGoGoCli" }