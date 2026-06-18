/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homesevenecosystems2Inputs */

const en_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`seven ecosystems`)
};

const es_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`siete ecosistemas`)
};

const zh_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七个生态`)
};

const ja_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`7つの生態系`)
};

const ko_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`일곱 개의 생태계`)
};

const zh_hant1_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`七個生態`)
};

const de_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sieben Ökosysteme`)
};

const fr_homesevenecosystems2 = /** @type {(inputs: Homesevenecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sept écosystèmes`)
};

/**
* | output |
* | --- |
* | "seven ecosystems" |
*
* @param {Homesevenecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homesevenecosystems2 = /** @type {((inputs?: Homesevenecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homesevenecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homesevenecosystems2(inputs)
	if (locale === "es") return es_homesevenecosystems2(inputs)
	if (locale === "zh") return zh_homesevenecosystems2(inputs)
	if (locale === "ja") return ja_homesevenecosystems2(inputs)
	if (locale === "ko") return ko_homesevenecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homesevenecosystems2(inputs)
	if (locale === "de") return de_homesevenecosystems2(inputs)
	return fr_homesevenecosystems2(inputs)
});
export { homesevenecosystems2 as "homeSevenEcosystems" }