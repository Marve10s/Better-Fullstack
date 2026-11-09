/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderunavailable1Inputs */



/**
* | output |
* | --- |
* | "Unavailable:" |
*
* @param {Builderunavailable1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderunavailable1 = /** @type {((inputs?: Builderunavailable1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderunavailable1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No disponible:")
	if (locale === "zh") return /** @type {LocalizedString} */ ("不可用：")
	if (locale === "ja") return /** @type {LocalizedString} */ ("利用不可:")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사용 불가:")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("不可用：")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nicht verfügbar:")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Indisponible:")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Недоступно:")
	return /** @type {LocalizedString} */ ("Unavailable:")
});
export { builderunavailable1 as "builderUnavailable" }