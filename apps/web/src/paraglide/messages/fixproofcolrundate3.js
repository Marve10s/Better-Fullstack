/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolrundate3Inputs */

const en_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const es_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const zh_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const ja_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const ko_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const zh_hant1_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const de_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const fr_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

const uk_fixproofcolrundate3 = /** @type {(inputs: Fixproofcolrundate3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run date`)
};

/**
* | output |
* | --- |
* | "Run date" |
*
* @param {Fixproofcolrundate3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolrundate3 = /** @type {((inputs?: Fixproofcolrundate3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolrundate3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolrundate3(inputs)
	if (locale === "zh") return zh_fixproofcolrundate3(inputs)
	if (locale === "ja") return ja_fixproofcolrundate3(inputs)
	if (locale === "ko") return ko_fixproofcolrundate3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolrundate3(inputs)
	if (locale === "de") return de_fixproofcolrundate3(inputs)
	if (locale === "fr") return fr_fixproofcolrundate3(inputs)
	if (locale === "uk") return uk_fixproofcolrundate3(inputs)
	return en_fixproofcolrundate3(inputs)
});
export { fixproofcolrundate3 as "fixproofColRunDate" }