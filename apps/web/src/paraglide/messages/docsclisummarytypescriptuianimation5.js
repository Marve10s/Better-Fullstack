/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuianimation5Inputs */



/**
* | output |
* | --- |
* | "Animation library." |
*
* @param {Docsclisummarytypescriptuianimation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuianimation5 = /** @type {((inputs?: Docsclisummarytypescriptuianimation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuianimation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de animación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("动画库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アニメーションライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("애니메이션 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("動畫函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Animationsbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque d’animation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека анімації.")
	return /** @type {LocalizedString} */ ("Animation library.")
});
export { docsclisummarytypescriptuianimation5 as "docsCliSummaryTypescriptUiAnimation" }