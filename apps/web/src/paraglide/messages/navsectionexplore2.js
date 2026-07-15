/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionexplore2Inputs */

const en_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explore`)
};

const es_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explorar`)
};

const zh_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`探索`)
};

const ja_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`探索`)
};

const ko_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`둘러보기`)
};

const zh_hant1_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`探索`)
};

const de_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entdecken`)
};

const fr_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explorer`)
};

const uk_navsectionexplore2 = /** @type {(inputs: Navsectionexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Огляд`)
};

/**
* | output |
* | --- |
* | "Explore" |
*
* @param {Navsectionexplore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectionexplore2 = /** @type {((inputs?: Navsectionexplore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectionexplore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsectionexplore2(inputs)
	if (locale === "es") return es_navsectionexplore2(inputs)
	if (locale === "zh") return zh_navsectionexplore2(inputs)
	if (locale === "ja") return ja_navsectionexplore2(inputs)
	if (locale === "ko") return ko_navsectionexplore2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navsectionexplore2(inputs)
	if (locale === "de") return de_navsectionexplore2(inputs)
	if (locale === "fr") return fr_navsectionexplore2(inputs)
	return uk_navsectionexplore2(inputs)
});
export { navsectionexplore2 as "navSectionExplore" }