/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navhome1Inputs */



/**
* | output |
* | --- |
* | "Better Fullstack home" |
*
* @param {Navhome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navhome1 = /** @type {((inputs?: Navhome1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navhome1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Inicio de Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Better Fullstack 首页")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Better Fullstack ホーム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Better Fullstack 홈")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Better Fullstack 首頁")
	if (locale === "de") return /** @type {LocalizedString} */ ("Better Fullstack Startseite")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Accueil Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Головна Better Fullstack")
	return /** @type {LocalizedString} */ ("Better Fullstack home")
});
export { navhome1 as "navHome" }