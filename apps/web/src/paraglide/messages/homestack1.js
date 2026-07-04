/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestack1Inputs */

const en_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack.`)
};

const es_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack.`)
};

const zh_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack。`)
};

const ja_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタック。`)
};

const ko_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택.`)
};

const zh_hant1_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`stack。`)
};

const de_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stapel.`)
};

const fr_homestack1 = /** @type {(inputs: Homestack1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`empiler.`)
};

/**
* | output |
* | --- |
* | "stack." |
*
* @param {Homestack1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homestack1 = /** @type {((inputs?: Homestack1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestack1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homestack1(inputs)
	if (locale === "es") return es_homestack1(inputs)
	if (locale === "zh") return zh_homestack1(inputs)
	if (locale === "ja") return ja_homestack1(inputs)
	if (locale === "ko") return ko_homestack1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestack1(inputs)
	if (locale === "de") return de_homestack1(inputs)
	return fr_homestack1(inputs)
});
export { homestack1 as "homeStack" }