/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopied1Inputs */

const en_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied`)
};

const es_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiado`)
};

const zh_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制`)
};

const ja_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーされました`)
};

const ko_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사됨`)
};

const zh_hant1_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已複製`)
};

const de_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopiert`)
};

const fr_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copié`)
};

const uk_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скопійовано`)
};

/**
* | output |
* | --- |
* | "Copied" |
*
* @param {Navcopied1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcopied1 = /** @type {((inputs?: Navcopied1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopied1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcopied1(inputs)
	if (locale === "es") return es_navcopied1(inputs)
	if (locale === "zh") return zh_navcopied1(inputs)
	if (locale === "ja") return ja_navcopied1(inputs)
	if (locale === "ko") return ko_navcopied1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcopied1(inputs)
	if (locale === "de") return de_navcopied1(inputs)
	if (locale === "fr") return fr_navcopied1(inputs)
	return uk_navcopied1(inputs)
});
export { navcopied1 as "navCopied" }