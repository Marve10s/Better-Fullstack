/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetguide1Inputs */

const en_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guide`)
};

const es_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guía`)
};

const zh_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指南`)
};

const ja_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ガイド`)
};

const ko_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가이드`)
};

const zh_hant1_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指南`)
};

const de_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führung`)
};

const fr_presetguide1 = /** @type {(inputs: Presetguide1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guide`)
};

/**
* | output |
* | --- |
* | "Guide" |
*
* @param {Presetguide1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetguide1 = /** @type {((inputs?: Presetguide1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetguide1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetguide1(inputs)
	if (locale === "es") return es_presetguide1(inputs)
	if (locale === "zh") return zh_presetguide1(inputs)
	if (locale === "ja") return ja_presetguide1(inputs)
	if (locale === "ko") return ko_presetguide1(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetguide1(inputs)
	if (locale === "de") return de_presetguide1(inputs)
	return fr_presetguide1(inputs)
});
export { presetguide1 as "presetGuide" }