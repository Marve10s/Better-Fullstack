/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navbuilder1Inputs */

const en_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const es_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor`)
};

const zh_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器`)
};

const ja_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダー`)
};

const ko_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더`)
};

const zh_hant1_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構器`)
};

const de_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const fr_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructeur`)
};

const uk_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Конструктор`)
};

/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Navbuilder1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navbuilder1 = /** @type {((inputs?: Navbuilder1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navbuilder1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navbuilder1(inputs)
	if (locale === "zh") return zh_navbuilder1(inputs)
	if (locale === "ja") return ja_navbuilder1(inputs)
	if (locale === "ko") return ko_navbuilder1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navbuilder1(inputs)
	if (locale === "de") return de_navbuilder1(inputs)
	if (locale === "fr") return fr_navbuilder1(inputs)
	if (locale === "uk") return uk_navbuilder1(inputs)
	return en_navbuilder1(inputs)
});
export { navbuilder1 as "navBuilder" }