/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionbuild2Inputs */

const en_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build`)
};

const es_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construir`)
};

const zh_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建`)
};

const ja_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`構築`)
};

const ko_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌드`)
};

const zh_hant1_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構`)
};

const de_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellen`)
};

const fr_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construire`)
};

const uk_docssectionbuild2 = /** @type {(inputs: Docssectionbuild2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Створення`)
};

/**
* | output |
* | --- |
* | "Build" |
*
* @param {Docssectionbuild2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionbuild2 = /** @type {((inputs?: Docssectionbuild2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionbuild2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssectionbuild2(inputs)
	if (locale === "zh") return zh_docssectionbuild2(inputs)
	if (locale === "ja") return ja_docssectionbuild2(inputs)
	if (locale === "ko") return ko_docssectionbuild2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionbuild2(inputs)
	if (locale === "de") return de_docssectionbuild2(inputs)
	if (locale === "fr") return fr_docssectionbuild2(inputs)
	if (locale === "uk") return uk_docssectionbuild2(inputs)
	return en_docssectionbuild2(inputs)
});
export { docssectionbuild2 as "docsSectionBuild" }