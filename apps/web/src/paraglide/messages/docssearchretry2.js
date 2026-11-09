/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchretry2Inputs */



/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Docssearchretry2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchretry2 = /** @type {((inputs?: Docssearchretry2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchretry2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Intentar de nuevo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重试")
	if (locale === "ja") return /** @type {LocalizedString} */ ("再試行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다시 시도")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重試")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erneut versuchen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réessayer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спробувати ще раз")
	return /** @type {LocalizedString} */ ("Try again")
});
export { docssearchretry2 as "docsSearchRetry" }