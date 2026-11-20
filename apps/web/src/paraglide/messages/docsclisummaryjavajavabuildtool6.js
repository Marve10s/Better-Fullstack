/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavabuildtool6Inputs */



/**
* | output |
* | --- |
* | "Build tool." |
*
* @param {Docsclisummaryjavajavabuildtool6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavabuildtool6 = /** @type {((inputs?: Docsclisummaryjavajavabuildtool6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavabuildtool6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramienta de compilación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルドツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建置工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Build-Werkzeug.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outil de build.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструмент збирання.")
	return /** @type {LocalizedString} */ ("Build tool.")
});
export { docsclisummaryjavajavabuildtool6 as "docsCliSummaryJavaJavaBuildTool" }