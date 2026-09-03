/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixprooflegendheading2Inputs */

const en_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legend`)
};

const es_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leyenda`)
};

const zh_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`图例`)
};

const ja_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`凡例`)
};

const ko_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`범례`)
};

const zh_hant1_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`圖例`)
};

const de_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legende`)
};

const fr_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Légende`)
};

const uk_fixprooflegendheading2 = /** @type {(inputs: Fixprooflegendheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Легенда`)
};

/**
* | output |
* | --- |
* | "Legend" |
*
* @param {Fixprooflegendheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixprooflegendheading2 = /** @type {((inputs?: Fixprooflegendheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixprooflegendheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixprooflegendheading2(inputs)
	if (locale === "zh") return zh_fixprooflegendheading2(inputs)
	if (locale === "ja") return ja_fixprooflegendheading2(inputs)
	if (locale === "ko") return ko_fixprooflegendheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixprooflegendheading2(inputs)
	if (locale === "de") return de_fixprooflegendheading2(inputs)
	if (locale === "fr") return fr_fixprooflegendheading2(inputs)
	if (locale === "uk") return uk_fixprooflegendheading2(inputs)
	return en_fixprooflegendheading2(inputs)
});
export { fixprooflegendheading2 as "fixproofLegendHeading" }