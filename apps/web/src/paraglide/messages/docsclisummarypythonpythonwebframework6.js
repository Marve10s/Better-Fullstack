/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonwebframework6Inputs */



/**
* | output |
* | --- |
* | "Python web framework." |
*
* @param {Docsclisummarypythonpythonwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonwebframework6 = /** @type {((inputs?: Docsclisummarypythonpythonwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework web Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python Web 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の Web フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 웹 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python Web 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Web-Framework für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework web Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вебфреймворк Python.")
	return /** @type {LocalizedString} */ ("Python web framework.")
});
export { docsclisummarypythonpythonwebframework6 as "docsCliSummaryPythonPythonWebFramework" }