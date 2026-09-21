/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosquestion2Inputs */

const en_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How many stacks?`)
};

const es_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Cuántos stacks?`)
};

const zh_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有多少种技术栈？`)
};

const ja_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックは何通り？`)
};

const ko_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택은 몇 가지?`)
};

const zh_hant1_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有多少種技術棧？`)
};

const de_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie viele Stacks?`)
};

const fr_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Combien de stacks ?`)
};

const uk_homecombosquestion2 = /** @type {(inputs: Homecombosquestion2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скільки стеків?`)
};

/**
* | output |
* | --- |
* | "How many stacks?" |
*
* @param {Homecombosquestion2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosquestion2 = /** @type {((inputs?: Homecombosquestion2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosquestion2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombosquestion2(inputs)
	if (locale === "zh") return zh_homecombosquestion2(inputs)
	if (locale === "ja") return ja_homecombosquestion2(inputs)
	if (locale === "ko") return ko_homecombosquestion2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombosquestion2(inputs)
	if (locale === "de") return de_homecombosquestion2(inputs)
	if (locale === "fr") return fr_homecombosquestion2(inputs)
	if (locale === "uk") return uk_homecombosquestion2(inputs)
	return en_homecombosquestion2(inputs)
});
export { homecombosquestion2 as "homeCombosQuestion" }