/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofgridcaption2Inputs */

const en_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const es_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const zh_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const ja_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const ko_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const zh_hant1_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const de_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const fr_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const uk_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

/**
* | output |
* | --- |
* | "One column per task, grouped by category, one row per model. Every cell is a single run." |
*
* @param {Fixproofgridcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofgridcaption2 = /** @type {((inputs?: Fixproofgridcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofgridcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofgridcaption2(inputs)
	if (locale === "zh") return zh_fixproofgridcaption2(inputs)
	if (locale === "ja") return ja_fixproofgridcaption2(inputs)
	if (locale === "ko") return ko_fixproofgridcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofgridcaption2(inputs)
	if (locale === "de") return de_fixproofgridcaption2(inputs)
	if (locale === "fr") return fr_fixproofgridcaption2(inputs)
	if (locale === "uk") return uk_fixproofgridcaption2(inputs)
	return en_fixproofgridcaption2(inputs)
});
export { fixproofgridcaption2 as "fixproofGridCaption" }