/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcniconlibrary6Inputs */



/**
* | output |
* | --- |
* | "Icon library." |
*
* @param {Docsclisummaryshadcnshadcniconlibrary6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcniconlibrary6 = /** @type {((inputs?: Docsclisummaryshadcnshadcniconlibrary6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcniconlibrary6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de iconos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("图标库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アイコンライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("아이콘 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("圖示函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Icon-Bibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque d’icônes.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека іконок.")
	return /** @type {LocalizedString} */ ("Icon library.")
});
export { docsclisummaryshadcnshadcniconlibrary6 as "docsCliSummaryShadcnShadcnIconLibrary" }