/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationpassed2Inputs */



/**
* | output |
* | --- |
* | "Passed" |
*
* @param {Docsverificationpassed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationpassed2 = /** @type {((inputs?: Docsverificationpassed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationpassed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Superado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("通过")
	if (locale === "ja") return /** @type {LocalizedString} */ ("合格")
	if (locale === "ko") return /** @type {LocalizedString} */ ("통과")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("通過")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bestanden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réussi")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пройдено")
	return /** @type {LocalizedString} */ ("Passed")
});
export { docsverificationpassed2 as "docsVerificationPassed" }