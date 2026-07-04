/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionoverview2Inputs */

const en_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overview`)
};

const es_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resumen`)
};

const zh_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`概览`)
};

const ja_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`概要`)
};

const ko_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개요`)
};

const zh_hant1_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`概覽`)
};

const de_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Überblick`)
};

const fr_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aperçu`)
};

const uk_docssectionoverview2 = /** @type {(inputs: Docssectionoverview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Огляд`)
};

/**
* | output |
* | --- |
* | "Overview" |
*
* @param {Docssectionoverview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionoverview2 = /** @type {((inputs?: Docssectionoverview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionoverview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionoverview2(inputs)
	if (locale === "es") return es_docssectionoverview2(inputs)
	if (locale === "zh") return zh_docssectionoverview2(inputs)
	if (locale === "ja") return ja_docssectionoverview2(inputs)
	if (locale === "ko") return ko_docssectionoverview2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionoverview2(inputs)
	if (locale === "de") return de_docssectionoverview2(inputs)
	if (locale === "fr") return fr_docssectionoverview2(inputs)
	return uk_docssectionoverview2(inputs)
});
export { docssectionoverview2 as "docsSectionOverview" }