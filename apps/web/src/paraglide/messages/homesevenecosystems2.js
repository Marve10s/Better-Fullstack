/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown> }} Homesevenecosystems2Inputs */

const en_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} ecosystems`)
};

const es_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} ecosistemas`)
};

const zh_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 个生态`)
};

const ja_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つのエコシステム`)
};

const ko_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개 생태계`)
};

const zh_hant1_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 個生態`)
};

const de_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} Ökosysteme`)
};

const fr_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} écosystèmes`)
};

const uk_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} екосистем`)
};

/**
* | output |
* | --- |
* | "{ecosystemCount} ecosystems" |
*
* @param {Homesevenecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homesevenecosystems2 = /** @type {((inputs: Homesevenecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homesevenecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homesevenecosystems2(inputs)
	if (locale === "es") return es_homesevenecosystems2(inputs)
	if (locale === "zh") return zh_homesevenecosystems2(inputs)
	if (locale === "ja") return ja_homesevenecosystems2(inputs)
	if (locale === "ko") return ko_homesevenecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homesevenecosystems2(inputs)
	if (locale === "de") return de_homesevenecosystems2(inputs)
	if (locale === "fr") return fr_homesevenecosystems2(inputs)
	return uk_homesevenecosystems2(inputs)
});
export { homesevenecosystems2 as "homeSevenEcosystems" }