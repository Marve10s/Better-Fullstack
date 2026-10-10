/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuianimation5Inputs */

const en_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Animation library.`)
};

const es_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de animación.`)
};

const zh_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`动画库。`)
};

const ja_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アニメーションライブラリ。`)
};

const ko_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`애니메이션 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`動畫函式庫。`)
};

const de_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Animationsbibliothek.`)
};

const fr_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque d’animation.`)
};

const uk_docsclisummarytypescriptuianimation5 = /** @type {(inputs: Docsclisummarytypescriptuianimation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека анімації.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuianimation5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuianimation5(inputs)
	return en_docsclisummarytypescriptuianimation5(inputs)
});
export { docsclisummarytypescriptuianimation5 as "docsCliSummaryTypescriptUiAnimation" }