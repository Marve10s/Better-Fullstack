/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliacceptedvalues3Inputs */



/**
* | output |
* | --- |
* | "Accepted values" |
*
* @param {Docscliacceptedvalues3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscliacceptedvalues3 = /** @type {((inputs?: Docscliacceptedvalues3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscliacceptedvalues3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Valores aceptados")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可接受的值")
	if (locale === "ja") return /** @type {LocalizedString} */ ("使用できる値")
	if (locale === "ko") return /** @type {LocalizedString} */ ("허용 값")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可接受的值")
	if (locale === "de") return /** @type {LocalizedString} */ ("Akzeptierte Werte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Valeurs acceptées")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Допустимі значення")
	return /** @type {LocalizedString} */ ("Accepted values")
});
export { docscliacceptedvalues3 as "docsCliAcceptedValues" }