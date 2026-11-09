/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationgenerated2Inputs */



/**
* | output |
* | --- |
* | "Generated" |
*
* @param {Docsverificationgenerated2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationgenerated2 = /** @type {((inputs?: Docsverificationgenerated2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationgenerated2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已生成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成済み")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已產生")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Généré")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Згенеровано")
	return /** @type {LocalizedString} */ ("Generated")
});
export { docsverificationgenerated2 as "docsVerificationGenerated" }