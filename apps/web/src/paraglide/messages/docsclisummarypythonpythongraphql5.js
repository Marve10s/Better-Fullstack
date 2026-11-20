/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythongraphql5Inputs */



/**
* | output |
* | --- |
* | "Python GraphQL." |
*
* @param {Docsclisummarypythonpythongraphql5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythongraphql5 = /** @type {((inputs?: Docsclisummarypythonpythongraphql5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythongraphql5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("GraphQL en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python GraphQL。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の GraphQL。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python GraphQL.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python GraphQL。")
	if (locale === "de") return /** @type {LocalizedString} */ ("GraphQL für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("GraphQL Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("GraphQL для Python.")
	return /** @type {LocalizedString} */ ("Python GraphQL.")
});
export { docsclisummarypythonpythongraphql5 as "docsCliSummaryPythonPythonGraphql" }