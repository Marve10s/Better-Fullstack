/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonobservability5Inputs */



/**
* | output |
* | --- |
* | "Python observability." |
*
* @param {Docsclisummarypythonpythonobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonobservability5 = /** @type {((inputs?: Docsclisummarypythonpythonobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Observabilidad en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 可观测性。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のオブザーバビリティ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 관측성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 可觀測性。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Observabilité Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спостережуваність у Python.")
	return /** @type {LocalizedString} */ ("Python observability.")
});
export { docsclisummarypythonpythonobservability5 as "docsCliSummaryPythonPythonObservability" }