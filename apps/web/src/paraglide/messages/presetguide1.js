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

/**
* | output |
* | --- |
* | "Guide" |
*
* @param {Presetguide1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetguide1 = /** @type {((inputs?: Presetguide1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetguide1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetguide1(inputs)
	if (locale === "es") return es_presetguide1(inputs)
	return zh_presetguide1(inputs)
});
export { presetguide1 as "presetGuide" }