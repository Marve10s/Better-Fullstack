/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceswebmcp6Inputs */



/**
* | output |
* | --- |
* | "Experimental browser-native WebMCP tools." |
*
* @param {Docsclisummarytypescriptserviceswebmcp6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptserviceswebmcp6 = /** @type {((inputs?: Docsclisummarytypescriptserviceswebmcp6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptserviceswebmcp6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas WebMCP experimentales nativas del navegador.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性的浏览器原生 WebMCP 工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザーネイティブの WebMCP ツール (実験的)。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적 브라우저 네이티브 WebMCP 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性的瀏覽器原生 WebMCP 工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimentelle WebMCP-Tools, die nativ im Browser laufen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils WebMCP expérimentaux natifs du navigateur.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальні інструменти WebMCP з нативною підтримкою браузера.")
	return /** @type {LocalizedString} */ ("Experimental browser-native WebMCP tools.")
});
export { docsclisummarytypescriptserviceswebmcp6 as "docsCliSummaryTypescriptServicesWebMcp" }