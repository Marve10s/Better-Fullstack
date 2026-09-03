/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofboardheading2Inputs */

const en_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const es_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const zh_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const ja_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const ko_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const zh_hant1_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const de_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const fr_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

const uk_fixproofboardheading2 = /** @type {(inputs: Fixproofboardheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Board`)
};

/**
* | output |
* | --- |
* | "Board" |
*
* @param {Fixproofboardheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofboardheading2 = /** @type {((inputs?: Fixproofboardheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofboardheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofboardheading2(inputs)
	if (locale === "zh") return zh_fixproofboardheading2(inputs)
	if (locale === "ja") return ja_fixproofboardheading2(inputs)
	if (locale === "ko") return ko_fixproofboardheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofboardheading2(inputs)
	if (locale === "de") return de_fixproofboardheading2(inputs)
	if (locale === "fr") return fr_fixproofboardheading2(inputs)
	if (locale === "uk") return uk_fixproofboardheading2(inputs)
	return en_fixproofboardheading2(inputs)
});
export { fixproofboardheading2 as "fixproofBoardHeading" }