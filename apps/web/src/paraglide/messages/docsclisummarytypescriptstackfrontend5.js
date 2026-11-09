/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackfrontend5Inputs */



/**
* | output |
* | --- |
* | "Web frontend framework(s)." |
*
* @param {Docsclisummarytypescriptstackfrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackfrontend5 = /** @type {((inputs?: Docsclisummarytypescriptstackfrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackfrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework(s) de frontend web.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Web 前端框架（可多个）。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Web フロントエンドのフレームワーク (複数可)。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("웹 프런트엔드 프레임워크(여러 개 가능).")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Web 前端框架（可選多個）。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Framework(s) für das Web-Frontend.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework(s) de frontend web.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фреймворк(и) вебфронтенду.")
	return /** @type {LocalizedString} */ ("Web frontend framework(s).")
});
export { docsclisummarytypescriptstackfrontend5 as "docsCliSummaryTypescriptStackFrontend" }