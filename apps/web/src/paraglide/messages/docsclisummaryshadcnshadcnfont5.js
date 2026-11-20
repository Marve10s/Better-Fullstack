/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnfont5Inputs */



/**
* | output |
* | --- |
* | "Default font." |
*
* @param {Docsclisummaryshadcnshadcnfont5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnfont5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnfont5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnfont5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Fuente predeterminada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("默认字体。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デフォルトのフォント。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본 글꼴.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設字型。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Standardschriftart.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Police par défaut.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Типовий шрифт.")
	return /** @type {LocalizedString} */ ("Default font.")
});
export { docsclisummaryshadcnshadcnfont5 as "docsCliSummaryShadcnShadcnFont" }