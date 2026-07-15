/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectioncreate2Inputs */

const en_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create`)
};

const es_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crear`)
};

const zh_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建`)
};

const ja_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`作成`)
};

const ko_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`만들기`)
};

const zh_hant1_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建立`)
};

const de_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellen`)
};

const fr_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Créer`)
};

const uk_navsectioncreate2 = /** @type {(inputs: Navsectioncreate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Створити`)
};

/**
* | output |
* | --- |
* | "Create" |
*
* @param {Navsectioncreate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectioncreate2 = /** @type {((inputs?: Navsectioncreate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectioncreate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navsectioncreate2(inputs)
	if (locale === "es") return es_navsectioncreate2(inputs)
	if (locale === "zh") return zh_navsectioncreate2(inputs)
	if (locale === "ja") return ja_navsectioncreate2(inputs)
	if (locale === "ko") return ko_navsectioncreate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navsectioncreate2(inputs)
	if (locale === "de") return de_navsectioncreate2(inputs)
	if (locale === "fr") return fr_navsectioncreate2(inputs)
	return uk_navsectioncreate2(inputs)
});
export { navsectioncreate2 as "navSectionCreate" }