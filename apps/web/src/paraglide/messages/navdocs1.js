/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navdocs1Inputs */

const en_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

const ja_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメント`)
};

const ko_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서`)
};

const zh_hant1_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

const de_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const fr_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const uk_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Документація`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Navdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navdocs1 = /** @type {((inputs?: Navdocs1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navdocs1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navdocs1(inputs)
	if (locale === "zh") return zh_navdocs1(inputs)
	if (locale === "ja") return ja_navdocs1(inputs)
	if (locale === "ko") return ko_navdocs1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navdocs1(inputs)
	if (locale === "de") return de_navdocs1(inputs)
	if (locale === "fr") return fr_navdocs1(inputs)
	if (locale === "uk") return uk_navdocs1(inputs)
	return en_navdocs1(inputs)
});
export { navdocs1 as "navDocs" }