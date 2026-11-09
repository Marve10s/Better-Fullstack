/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Bloglinkcopied2Inputs */



/**
* | output |
* | --- |
* | "Link copied" |
*
* @param {Bloglinkcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const bloglinkcopied2 = /** @type {((inputs?: Bloglinkcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Bloglinkcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Enlace copiado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已复制链接")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コピーしました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("링크 복사됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已複製連結")
	if (locale === "de") return /** @type {LocalizedString} */ ("Link kopiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lien copié")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Посилання скопійовано")
	return /** @type {LocalizedString} */ ("Link copied")
});
export { bloglinkcopied2 as "blogLinkCopied" }