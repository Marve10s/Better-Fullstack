/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcniconlibrary6Inputs */

const en_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Icon library.`)
};

const es_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de iconos.`)
};

const zh_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`图标库。`)
};

const ja_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アイコンライブラリ。`)
};

const ko_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`아이콘 라이브러리.`)
};

const zh_hant1_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`圖示函式庫。`)
};

const de_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Icon-Bibliothek.`)
};

const fr_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque d’icônes.`)
};

const uk_docsclisummaryshadcnshadcniconlibrary6 = /** @type {(inputs: Docsclisummaryshadcnshadcniconlibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека іконок.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcniconlibrary6(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcniconlibrary6(inputs)
	return en_docsclisummaryshadcnshadcniconlibrary6(inputs)
});
export { docsclisummaryshadcnshadcniconlibrary6 as "docsCliSummaryShadcnShadcnIconLibrary" }