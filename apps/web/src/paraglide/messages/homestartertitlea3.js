/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartertitlea3Inputs */

const en_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What's your`)
};

const es_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Cuál es tu`)
};

const zh_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的下一个`)
};

const ja_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次のプロジェクトは`)
};

const ko_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음 프로젝트는`)
};

const zh_hant1_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你的下一個`)
};

const de_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Was ist dein`)
};

const fr_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quel est votre`)
};

const uk_homestartertitlea3 = /** @type {(inputs: Homestartertitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Який твій`)
};

/**
* | output |
* | --- |
* | "What's your" |
*
* @param {Homestartertitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartertitlea3 = /** @type {((inputs?: Homestartertitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartertitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartertitlea3(inputs)
	if (locale === "zh") return zh_homestartertitlea3(inputs)
	if (locale === "ja") return ja_homestartertitlea3(inputs)
	if (locale === "ko") return ko_homestartertitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartertitlea3(inputs)
	if (locale === "de") return de_homestartertitlea3(inputs)
	if (locale === "fr") return fr_homestartertitlea3(inputs)
	if (locale === "uk") return uk_homestartertitlea3(inputs)
	return en_homestartertitlea3(inputs)
});
export { homestartertitlea3 as "homeStarterTitleA" }