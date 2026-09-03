/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevoided2Inputs */

const en_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const es_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const zh_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const ja_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const ko_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const zh_hant1_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const de_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const fr_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const uk_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

/**
* | output |
* | --- |
* | "A provider quota error ended it before the agent could work. It is excluded rather than counted against the model." |
*
* @param {Fixproofprovenancevoided2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevoided2 = /** @type {((inputs?: Fixproofprovenancevoided2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevoided2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevoided2(inputs)
	if (locale === "zh") return zh_fixproofprovenancevoided2(inputs)
	if (locale === "ja") return ja_fixproofprovenancevoided2(inputs)
	if (locale === "ko") return ko_fixproofprovenancevoided2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevoided2(inputs)
	if (locale === "de") return de_fixproofprovenancevoided2(inputs)
	if (locale === "fr") return fr_fixproofprovenancevoided2(inputs)
	if (locale === "uk") return uk_fixproofprovenancevoided2(inputs)
	return en_fixproofprovenancevoided2(inputs)
});
export { fixproofprovenancevoided2 as "fixproofProvenanceVoided" }