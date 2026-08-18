/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartertitleb3Inputs */

const en_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`next project?`)
};

const es_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`próximo proyecto?`)
};

const zh_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目是什么？`)
};

const ja_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`何ですか？`)
};

const ko_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`무엇인가요?`)
};

const zh_hant1_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`專案是什麼？`)
};

const de_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`nächstes Projekt?`)
};

const fr_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prochain projet ?`)
};

const uk_homestartertitleb3 = /** @type {(inputs: Homestartertitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`наступний проєкт?`)
};

/**
* | output |
* | --- |
* | "next project?" |
*
* @param {Homestartertitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartertitleb3 = /** @type {((inputs?: Homestartertitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartertitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartertitleb3(inputs)
	if (locale === "zh") return zh_homestartertitleb3(inputs)
	if (locale === "ja") return ja_homestartertitleb3(inputs)
	if (locale === "ko") return ko_homestartertitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartertitleb3(inputs)
	if (locale === "de") return de_homestartertitleb3(inputs)
	if (locale === "fr") return fr_homestartertitleb3(inputs)
	if (locale === "uk") return uk_homestartertitleb3(inputs)
	return en_homestartertitleb3(inputs)
});
export { homestartertitleb3 as "homeStarterTitleB" }