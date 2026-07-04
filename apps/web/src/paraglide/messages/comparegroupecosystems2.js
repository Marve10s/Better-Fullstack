/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupecosystems2Inputs */

const en_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosystems`)
};

const es_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistemas`)
};

const zh_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生态`)
};

const ja_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生態系`)
};

const ko_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생태계`)
};

const zh_hant1_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生態`)
};

const de_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ökosysteme`)
};

const fr_comparegroupecosystems2 = /** @type {(inputs: Comparegroupecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Écosystèmes`)
};

/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Comparegroupecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegroupecosystems2 = /** @type {((inputs?: Comparegroupecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupecosystems2(inputs)
	if (locale === "es") return es_comparegroupecosystems2(inputs)
	if (locale === "zh") return zh_comparegroupecosystems2(inputs)
	if (locale === "ja") return ja_comparegroupecosystems2(inputs)
	if (locale === "ko") return ko_comparegroupecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupecosystems2(inputs)
	if (locale === "de") return de_comparegroupecosystems2(inputs)
	return fr_comparegroupecosystems2(inputs)
});
export { comparegroupecosystems2 as "compareGroupEcosystems" }