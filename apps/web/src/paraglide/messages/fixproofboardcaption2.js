/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofboardcaption2Inputs */

const en_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const es_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const zh_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const ja_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const ko_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const zh_hant1_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const de_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const fr_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const uk_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

/**
* | output |
* | --- |
* | "One row per model. Sort by either index. The question mark on a column explains what it counts." |
*
* @param {Fixproofboardcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofboardcaption2 = /** @type {((inputs?: Fixproofboardcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofboardcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofboardcaption2(inputs)
	if (locale === "zh") return zh_fixproofboardcaption2(inputs)
	if (locale === "ja") return ja_fixproofboardcaption2(inputs)
	if (locale === "ko") return ko_fixproofboardcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofboardcaption2(inputs)
	if (locale === "de") return de_fixproofboardcaption2(inputs)
	if (locale === "fr") return fr_fixproofboardcaption2(inputs)
	if (locale === "uk") return uk_fixproofboardcaption2(inputs)
	return en_fixproofboardcaption2(inputs)
});
export { fixproofboardcaption2 as "fixproofBoardCaption" }