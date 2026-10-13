/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptserviceswebmcp6Inputs */

const en_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental browser-native WebMCP tools.`)
};

const es_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas WebMCP experimentales nativas del navegador.`)
};

const zh_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性的浏览器原生 WebMCP 工具。`)
};

const ja_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブラウザーネイティブの WebMCP ツール (実験的)。`)
};

const ko_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적 브라우저 네이티브 WebMCP 도구.`)
};

const zh_hant1_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性的瀏覽器原生 WebMCP 工具。`)
};

const de_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle WebMCP-Tools, die nativ im Browser laufen.`)
};

const fr_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils WebMCP expérimentaux natifs du navigateur.`)
};

const uk_docsclisummarytypescriptserviceswebmcp6 = /** @type {(inputs: Docsclisummarytypescriptserviceswebmcp6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальні інструменти WebMCP з нативною підтримкою браузера.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptserviceswebmcp6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptserviceswebmcp6(inputs)
	return en_docsclisummarytypescriptserviceswebmcp6(inputs)
});
export { docsclisummarytypescriptserviceswebmcp6 as "docsCliSummaryTypescriptServicesWebMcp" }