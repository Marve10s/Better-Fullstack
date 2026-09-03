/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartregionaria3Inputs */

const en_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof scatter chart`)
};

const es_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gráfico de dispersión de Fixproof`)
};

const zh_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 散点图`)
};

const ja_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 散布図`)
};

const ko_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 산점도`)
};

const zh_hant1_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof 散佈圖`)
};

const de_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixproof-Streudiagramm`)
};

const fr_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nuage de points Fixproof`)
};

const uk_fixproofchartregionaria3 = /** @type {(inputs: Fixproofchartregionaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Точкова діаграма Fixproof`)
};

/**
* | output |
* | --- |
* | "Fixproof scatter chart" |
*
* @param {Fixproofchartregionaria3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartregionaria3 = /** @type {((inputs?: Fixproofchartregionaria3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartregionaria3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartregionaria3(inputs)
	if (locale === "zh") return zh_fixproofchartregionaria3(inputs)
	if (locale === "ja") return ja_fixproofchartregionaria3(inputs)
	if (locale === "ko") return ko_fixproofchartregionaria3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartregionaria3(inputs)
	if (locale === "de") return de_fixproofchartregionaria3(inputs)
	if (locale === "fr") return fr_fixproofchartregionaria3(inputs)
	if (locale === "uk") return uk_fixproofchartregionaria3(inputs)
	return en_fixproofchartregionaria3(inputs)
});
export { fixproofchartregionaria3 as "fixproofChartRegionAria" }