/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitleb3Inputs */

const en_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`By the community.`)
};

const es_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Por la comunidad.`)
};

const zh_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社区共建。`)
};

const ja_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コミュニティによって。`)
};

const ko_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`커뮤니티에 의해.`)
};

const zh_hant1_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`社群共建。`)
};

const de_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Von der Community.`)
};

const fr_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Par la communauté.`)
};

const uk_homecontributorstitleb3 = /** @type {(inputs: Homecontributorstitleb3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Разом зі спільнотою.`)
};

/**
* | output |
* | --- |
* | "By the community." |
*
* @param {Homecontributorstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributorstitleb3 = /** @type {((inputs?: Homecontributorstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecontributorstitleb3(inputs)
	if (locale === "zh") return zh_homecontributorstitleb3(inputs)
	if (locale === "ja") return ja_homecontributorstitleb3(inputs)
	if (locale === "ko") return ko_homecontributorstitleb3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecontributorstitleb3(inputs)
	if (locale === "de") return de_homecontributorstitleb3(inputs)
	if (locale === "fr") return fr_homecontributorstitleb3(inputs)
	if (locale === "uk") return uk_homecontributorstitleb3(inputs)
	return en_homecontributorstitleb3(inputs)
});
export { homecontributorstitleb3 as "homeContributorsTitleB" }