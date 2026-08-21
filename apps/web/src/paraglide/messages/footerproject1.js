/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerproject1Inputs */

const en_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const es_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyecto`)
};

const zh_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目`)
};

const ja_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクト`)
};

const ko_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트`)
};

const zh_hant1_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`專案`)
};

const de_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekt`)
};

const fr_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projet`)
};

const uk_footerproject1 = /** @type {(inputs: Footerproject1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Проєкт`)
};

/**
* | output |
* | --- |
* | "Project" |
*
* @param {Footerproject1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerproject1 = /** @type {((inputs?: Footerproject1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerproject1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_footerproject1(inputs)
	if (locale === "zh") return zh_footerproject1(inputs)
	if (locale === "ja") return ja_footerproject1(inputs)
	if (locale === "ko") return ko_footerproject1(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerproject1(inputs)
	if (locale === "de") return de_footerproject1(inputs)
	if (locale === "fr") return fr_footerproject1(inputs)
	if (locale === "uk") return uk_footerproject1(inputs)
	return en_footerproject1(inputs)
});
export { footerproject1 as "footerProject" }