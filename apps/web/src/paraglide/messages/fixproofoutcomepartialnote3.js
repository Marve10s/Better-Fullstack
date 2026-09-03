/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomepartialnote3Inputs */

const en_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const es_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const zh_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const ja_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const ko_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const zh_hant1_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const de_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const fr_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

const uk_fixproofoutcomepartialnote3 = /** @type {(inputs: Fixproofoutcomepartialnote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Some requirements went from failing to passing. The cell shows how many.`)
};

/**
* | output |
* | --- |
* | "Some requirements went from failing to passing. The cell shows how many." |
*
* @param {Fixproofoutcomepartialnote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomepartialnote3 = /** @type {((inputs?: Fixproofoutcomepartialnote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomepartialnote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomepartialnote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomepartialnote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomepartialnote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomepartialnote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomepartialnote3(inputs)
	if (locale === "de") return de_fixproofoutcomepartialnote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomepartialnote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomepartialnote3(inputs)
	return en_fixproofoutcomepartialnote3(inputs)
});
export { fixproofoutcomepartialnote3 as "fixproofOutcomePartialNote" }