/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown> }} Homeecosystemcount2Inputs */

const en_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} ecosystems`)
};

const es_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} ecosistemas`)
};

const zh_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 个生态`)
};

const ja_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つのエコシステム`)
};

const ko_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개의 생태계`)
};

const zh_hant1_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 個生態`)
};

const de_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} Ökosysteme`)
};

const fr_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} écosystèmes`)
};

const uk_homeecosystemcount2 = /** @type {(inputs: Homeecosystemcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} екосистем`)
};

/**
* | output |
* | --- |
* | "{ecosystemCount} ecosystems" |
*
* @param {Homeecosystemcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeecosystemcount2 = /** @type {((inputs: Homeecosystemcount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeecosystemcount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeecosystemcount2(inputs)
	if (locale === "zh") return zh_homeecosystemcount2(inputs)
	if (locale === "ja") return ja_homeecosystemcount2(inputs)
	if (locale === "ko") return ko_homeecosystemcount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeecosystemcount2(inputs)
	if (locale === "de") return de_homeecosystemcount2(inputs)
	if (locale === "fr") return fr_homeecosystemcount2(inputs)
	if (locale === "uk") return uk_homeecosystemcount2(inputs)
	return en_homeecosystemcount2(inputs)
});
export { homeecosystemcount2 as "homeEcosystemCount" }