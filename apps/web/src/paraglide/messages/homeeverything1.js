/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeeverything1Inputs */

const en_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Everything.`)
};

const es_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todo.`)
};

const zh_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全都支持。`)
};

const ja_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべて。`)
};

const ko_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 것.`)
};

const zh_hant1_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全都支援。`)
};

const de_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alles.`)
};

const fr_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tout.`)
};

const uk_homeeverything1 = /** @type {(inputs: Homeeverything1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Усе.`)
};

/**
* | output |
* | --- |
* | "Everything." |
*
* @param {Homeeverything1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeeverything1 = /** @type {((inputs?: Homeeverything1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeeverything1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeeverything1(inputs)
	if (locale === "zh") return zh_homeeverything1(inputs)
	if (locale === "ja") return ja_homeeverything1(inputs)
	if (locale === "ko") return ko_homeeverything1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeeverything1(inputs)
	if (locale === "de") return de_homeeverything1(inputs)
	if (locale === "fr") return fr_homeeverything1(inputs)
	if (locale === "uk") return uk_homeeverything1(inputs)
	return en_homeeverything1(inputs)
});
export { homeeverything1 as "homeEverything" }