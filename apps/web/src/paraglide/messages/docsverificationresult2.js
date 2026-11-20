/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationresult2Inputs */



/**
* | output |
* | --- |
* | "Result" |
*
* @param {Docsverificationresult2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationresult2 = /** @type {((inputs?: Docsverificationresult2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationresult2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Resultado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("结果")
	if (locale === "ja") return /** @type {LocalizedString} */ ("結果")
	if (locale === "ko") return /** @type {LocalizedString} */ ("결과")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("結果")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ergebnis")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Résultat")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Результат")
	return /** @type {LocalizedString} */ ("Result")
});
export { docsverificationresult2 as "docsVerificationResult" }