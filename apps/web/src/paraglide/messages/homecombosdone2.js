/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosdone2Inputs */

const en_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`done`)
};

const es_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`hecho`)
};

const zh_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成`)
};

const ja_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完了`)
};

const ko_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`완료`)
};

const zh_hant1_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成`)
};

const de_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`geschafft`)
};

const fr_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`fait`)
};

const uk_homecombosdone2 = /** @type {(inputs: Homecombosdone2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`готово`)
};

/**
* | output |
* | --- |
* | "done" |
*
* @param {Homecombosdone2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosdone2 = /** @type {((inputs?: Homecombosdone2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosdone2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombosdone2(inputs)
	if (locale === "zh") return zh_homecombosdone2(inputs)
	if (locale === "ja") return ja_homecombosdone2(inputs)
	if (locale === "ko") return ko_homecombosdone2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombosdone2(inputs)
	if (locale === "de") return de_homecombosdone2(inputs)
	if (locale === "fr") return fr_homecombosdone2(inputs)
	if (locale === "uk") return uk_homecombosdone2(inputs)
	return en_homecombosdone2(inputs)
});
export { homecombosdone2 as "homeCombosDone" }