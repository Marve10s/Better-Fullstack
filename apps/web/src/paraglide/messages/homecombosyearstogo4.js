/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosyearstogo4Inputs */

const en_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`years to go`)
};

const es_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`años por delante`)
};

const zh_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年才能试完`)
};

const ja_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年かかります`)
};

const ko_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`년 남음`)
};

const zh_hant1_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`年才能試完`)
};

const de_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jahre noch`)
};

const fr_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`années restantes`)
};

const uk_homecombosyearstogo4 = /** @type {(inputs: Homecombosyearstogo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`років попереду`)
};

/**
* | output |
* | --- |
* | "years to go" |
*
* @param {Homecombosyearstogo4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosyearstogo4 = /** @type {((inputs?: Homecombosyearstogo4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosyearstogo4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombosyearstogo4(inputs)
	if (locale === "zh") return zh_homecombosyearstogo4(inputs)
	if (locale === "ja") return ja_homecombosyearstogo4(inputs)
	if (locale === "ko") return ko_homecombosyearstogo4(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombosyearstogo4(inputs)
	if (locale === "de") return de_homecombosyearstogo4(inputs)
	if (locale === "fr") return fr_homecombosyearstogo4(inputs)
	if (locale === "uk") return uk_homecombosyearstogo4(inputs)
	return en_homecombosyearstogo4(inputs)
});
export { homecombosyearstogo4 as "homeCombosYearsToGo" }