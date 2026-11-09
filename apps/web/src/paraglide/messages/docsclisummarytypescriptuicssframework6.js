/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuicssframework6Inputs */



/**
* | output |
* | --- |
* | "CSS framework." |
*
* @param {Docsclisummarytypescriptuicssframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuicssframework6 = /** @type {((inputs?: Docsclisummarytypescriptuicssframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuicssframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework CSS.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("CSS 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("CSS フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("CSS 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("CSS 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("CSS-Framework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework CSS.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("CSS-фреймворк.")
	return /** @type {LocalizedString} */ ("CSS framework.")
});
export { docsclisummarytypescriptuicssframework6 as "docsCliSummaryTypescriptUiCssFramework" }