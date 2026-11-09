/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappintent4Inputs */



/**
* | output |
* | --- |
* | "Start native" |
*
* @param {Presettrackmobileappintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappintent4 = /** @type {((inputs?: Presettrackmobileappintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Empezar nativo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("从原生开始")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ネイティブを始める")
	if (locale === "ko") return /** @type {LocalizedString} */ ("네이티브 시작")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("從原生開始")
	if (locale === "de") return /** @type {LocalizedString} */ ("Beginnen Sie nativ")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commencer en mode natif")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Почати з native")
	return /** @type {LocalizedString} */ ("Start native")
});
export { presettrackmobileappintent4 as "presetTrackMobileAppIntent" }