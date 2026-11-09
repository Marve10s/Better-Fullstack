/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonapi5Inputs */



/**
* | output |
* | --- |
* | "Python API framework." |
*
* @param {Docsclisummarypythonpythonapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonapi5 = /** @type {((inputs?: Docsclisummarypythonpythonapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework API Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python API 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の API フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python API 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python API 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("API-Framework für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework API Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("API-фреймворк Python.")
	return /** @type {LocalizedString} */ ("Python API framework.")
});
export { docsclisummarypythonpythonapi5 as "docsCliSummaryPythonPythonApi" }