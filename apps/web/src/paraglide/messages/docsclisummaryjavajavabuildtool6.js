/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavabuildtool6Inputs */

const en_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build tool.`)
};

const es_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramienta de compilación.`)
};

const zh_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建工具。`)
};

const ja_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルドツール。`)
};

const ko_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드 도구.`)
};

const zh_hant1_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建置工具。`)
};

const de_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build-Werkzeug.`)
};

const fr_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outil de build.`)
};

const uk_docsclisummaryjavajavabuildtool6 = /** @type {(inputs: Docsclisummaryjavajavabuildtool6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструмент збирання.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "de") return de_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavabuildtool6(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavabuildtool6(inputs)
	return en_docsclisummaryjavajavabuildtool6(inputs)
});
export { docsclisummaryjavajavabuildtool6 as "docsCliSummaryJavaJavaBuildTool" }