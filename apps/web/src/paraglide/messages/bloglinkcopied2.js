/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Bloglinkcopied2Inputs */

const en_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link copied`)
};

const es_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlace copiado`)
};

const zh_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制链接`)
};

const ja_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーしました`)
};

const ko_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`링크 복사됨`)
};

const zh_hant1_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已複製連結`)
};

const de_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link kopiert`)
};

const fr_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lien copié`)
};

const uk_bloglinkcopied2 = /** @type {(inputs: Bloglinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Посилання скопійовано`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_bloglinkcopied2(inputs)
	if (locale === "es") return es_bloglinkcopied2(inputs)
	if (locale === "zh") return zh_bloglinkcopied2(inputs)
	if (locale === "ja") return ja_bloglinkcopied2(inputs)
	if (locale === "ko") return ko_bloglinkcopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_bloglinkcopied2(inputs)
	if (locale === "de") return de_bloglinkcopied2(inputs)
	if (locale === "fr") return fr_bloglinkcopied2(inputs)
	return uk_bloglinkcopied2(inputs)
});
export { bloglinkcopied2 as "blogLinkCopied" }