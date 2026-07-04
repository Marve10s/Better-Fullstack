/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepossibilities1Inputs */

const en_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`possibilities.`)
};

const es_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`infinitas.`)
};

const zh_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能性。`)
};

const ja_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能性。`)
};

const ko_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가능성.`)
};

const zh_hant1_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能性。`)
};

const de_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Möglichkeiten.`)
};

const fr_homepossibilities1 = /** @type {(inputs: Homepossibilities1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`possibilités.`)
};

/**
* | output |
* | --- |
* | "possibilities." |
*
* @param {Homepossibilities1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homepossibilities1 = /** @type {((inputs?: Homepossibilities1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepossibilities1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepossibilities1(inputs)
	if (locale === "es") return es_homepossibilities1(inputs)
	if (locale === "zh") return zh_homepossibilities1(inputs)
	if (locale === "ja") return ja_homepossibilities1(inputs)
	if (locale === "ko") return ko_homepossibilities1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homepossibilities1(inputs)
	if (locale === "de") return de_homepossibilities1(inputs)
	return fr_homepossibilities1(inputs)
});
export { homepossibilities1 as "homePossibilities" }