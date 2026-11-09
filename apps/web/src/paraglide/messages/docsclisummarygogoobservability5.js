/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoobservability5Inputs */



/**
* | output |
* | --- |
* | "Go observability." |
*
* @param {Docsclisummarygogoobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoobservability5 = /** @type {((inputs?: Docsclisummarygogoobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Observabilidad en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 可观测性。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のオブザーバビリティ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 관측성.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 可觀測性。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Observability für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Observabilité Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спостережуваність у Go.")
	return /** @type {LocalizedString} */ ("Go observability.")
});
export { docsclisummarygogoobservability5 as "docsCliSummaryGoGoObservability" }