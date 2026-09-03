/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixprooffooternote2Inputs */

const en_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const es_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const zh_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const ja_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const ko_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const zh_hant1_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const de_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const fr_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const uk_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

/**
* | output |
* | --- |
* | "Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added." |
*
* @param {Fixprooffooternote2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixprooffooternote2 = /** @type {((inputs?: Fixprooffooternote2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixprooffooternote2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixprooffooternote2(inputs)
	if (locale === "zh") return zh_fixprooffooternote2(inputs)
	if (locale === "ja") return ja_fixprooffooternote2(inputs)
	if (locale === "ko") return ko_fixprooffooternote2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixprooffooternote2(inputs)
	if (locale === "de") return de_fixprooffooternote2(inputs)
	if (locale === "fr") return fr_fixprooffooternote2(inputs)
	if (locale === "uk") return uk_fixprooffooternote2(inputs)
	return en_fixprooffooternote2(inputs)
});
export { fixprooffooternote2 as "fixproofFooterNote" }