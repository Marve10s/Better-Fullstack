/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareseotitle2Inputs */



/**
* | output |
* | --- |
* | "Compare Fullstack Scaffolding Tools \| Better Fullstack" |
*
* @param {Compareseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareseotitle2 = /** @type {((inputs?: Compareseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comparar herramientas de scaffolding fullstack | Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("比较全栈脚手架工具 | Better Fullstack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フルスタック足場ツールの比較 | Better Fullstack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("풀스택 스캐폴딩 도구 비교 | Better Fullstack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("比較全端腳手架工具 | Better Fullstack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vergleichen Sie Fullstack-Gerüstwerkzeuge | Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Comparez les outils d'échafaudage Fullstack | Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Порівняння інструментів фулстек-скафолдингу | Better Fullstack")
	return /** @type {LocalizedString} */ ("Compare Fullstack Scaffolding Tools | Better Fullstack")
});
export { compareseotitle2 as "compareSeoTitle" }