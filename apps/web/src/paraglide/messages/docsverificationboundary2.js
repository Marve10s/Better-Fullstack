/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationboundary2Inputs */



/**
* | output |
* | --- |
* | "Runtime boundary" |
*
* @param {Docsverificationboundary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationboundary2 = /** @type {((inputs?: Docsverificationboundary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationboundary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Límite de ejecución")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行时边界")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイム境界")
	if (locale === "ko") return /** @type {LocalizedString} */ ("런타임 경계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行階段邊界")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laufzeitgrenze")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frontière d'exécution")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Межа виконання")
	return /** @type {LocalizedString} */ ("Runtime boundary")
});
export { docsverificationboundary2 as "docsVerificationBoundary" }