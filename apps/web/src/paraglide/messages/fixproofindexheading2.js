/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofindexheading2Inputs */

const en_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Index bars`)
};

const es_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barras de índice`)
};

const zh_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指数条`)
};

const ja_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指数バー`)
};

const ko_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지수 막대`)
};

const zh_hant1_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指數條`)
};

const de_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Indexbalken`)
};

const fr_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barres d'indice`)
};

const uk_fixproofindexheading2 = /** @type {(inputs: Fixproofindexheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Смуги індексів`)
};

/**
* | output |
* | --- |
* | "Index bars" |
*
* @param {Fixproofindexheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofindexheading2 = /** @type {((inputs?: Fixproofindexheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofindexheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofindexheading2(inputs)
	if (locale === "zh") return zh_fixproofindexheading2(inputs)
	if (locale === "ja") return ja_fixproofindexheading2(inputs)
	if (locale === "ko") return ko_fixproofindexheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofindexheading2(inputs)
	if (locale === "de") return de_fixproofindexheading2(inputs)
	if (locale === "fr") return fr_fixproofindexheading2(inputs)
	if (locale === "uk") return uk_fixproofindexheading2(inputs)
	return en_fixproofindexheading2(inputs)
});
export { fixproofindexheading2 as "fixproofIndexHeading" }