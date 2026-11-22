/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Gohome1Inputs */



/**
* | output |
* | --- |
* | "Go Home" |
*
* @param {Gohome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const gohome1 = /** @type {((inputs?: Gohome1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Gohome1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ir al inicio")
	if (locale === "zh") return /** @type {LocalizedString} */ ("返回首页")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ホームに戻る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("홈으로 이동")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("回首頁")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zur Startseite")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Retour à l'accueil")
	if (locale === "uk") return /** @type {LocalizedString} */ ("На головну")
	return /** @type {LocalizedString} */ ("Go Home")
});
export { gohome1 as "goHome" }