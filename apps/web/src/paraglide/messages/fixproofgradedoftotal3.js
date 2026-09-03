/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ graded: NonNullable<unknown>, total: NonNullable<unknown> }} Fixproofgradedoftotal3Inputs */

const en_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const es_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const zh_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const ja_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const ko_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const zh_hant1_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const de_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const fr_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

const uk_fixproofgradedoftotal3 = /** @type {(inputs: Fixproofgradedoftotal3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.graded} of ${i?.total}`)
};

/**
* | output |
* | --- |
* | "{graded} of {total}" |
*
* @param {Fixproofgradedoftotal3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofgradedoftotal3 = /** @type {((inputs: Fixproofgradedoftotal3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofgradedoftotal3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofgradedoftotal3(inputs)
	if (locale === "zh") return zh_fixproofgradedoftotal3(inputs)
	if (locale === "ja") return ja_fixproofgradedoftotal3(inputs)
	if (locale === "ko") return ko_fixproofgradedoftotal3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofgradedoftotal3(inputs)
	if (locale === "de") return de_fixproofgradedoftotal3(inputs)
	if (locale === "fr") return fr_fixproofgradedoftotal3(inputs)
	if (locale === "uk") return uk_fixproofgradedoftotal3(inputs)
	return en_fixproofgradedoftotal3(inputs)
});
export { fixproofgradedoftotal3 as "fixproofGradedOfTotal" }