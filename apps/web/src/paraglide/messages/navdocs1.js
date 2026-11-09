/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navdocs1Inputs */



/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Navdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navdocs1 = /** @type {((inputs?: Navdocs1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navdocs1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Docs")
	if (locale === "zh") return /** @type {LocalizedString} */ ("文档")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメント")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("文件")
	if (locale === "de") return /** @type {LocalizedString} */ ("Docs")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Docs")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Документація")
	return /** @type {LocalizedString} */ ("Docs")
});
export { navdocs1 as "navDocs" }