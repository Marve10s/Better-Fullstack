/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uiclose1Inputs */



/**
* | output |
* | --- |
* | "Close" |
*
* @param {Uiclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const uiclose1 = /** @type {((inputs?: Uiclose1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uiclose1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cerrar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭")
	if (locale === "ja") return /** @type {LocalizedString} */ ("閉じる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("닫기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("關閉")
	if (locale === "de") return /** @type {LocalizedString} */ ("Schließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fermer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Закрити")
	return /** @type {LocalizedString} */ ("Close")
});
export { uiclose1 as "uiClose" }