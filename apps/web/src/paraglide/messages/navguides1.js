/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navguides1Inputs */

const en_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guides`)
};

const es_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías`)
};

const zh_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指南`)
};

const ja_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ガイド`)
};

const ko_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가이드`)
};

const zh_hant1_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指南`)
};

const de_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führer`)
};

const fr_navguides1 = /** @type {(inputs: Navguides1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guides`)
};

/**
* | output |
* | --- |
* | "Guides" |
*
* @param {Navguides1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navguides1 = /** @type {((inputs?: Navguides1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navguides1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navguides1(inputs)
	if (locale === "es") return es_navguides1(inputs)
	if (locale === "zh") return zh_navguides1(inputs)
	if (locale === "ja") return ja_navguides1(inputs)
	if (locale === "ko") return ko_navguides1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navguides1(inputs)
	if (locale === "de") return de_navguides1(inputs)
	return fr_navguides1(inputs)
});
export { navguides1 as "navGuides" }