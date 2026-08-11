/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepedit2Inputs */

const en_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Change the source`)
};

const es_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambia el código`)
};

const zh_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改源码`)
};

const ja_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ソースを変更`)
};

const ko_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`소스 수정`)
};

const zh_hant1_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改原始碼`)
};

const de_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ändere den Quellcode`)
};

const fr_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modifiez le code source`)
};

const uk_campaignstepedit2 = /** @type {(inputs: Campaignstepedit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Змініть код`)
};

/**
* | output |
* | --- |
* | "Change the source" |
*
* @param {Campaignstepedit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepedit2 = /** @type {((inputs?: Campaignstepedit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepedit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignstepedit2(inputs)
	if (locale === "zh") return zh_campaignstepedit2(inputs)
	if (locale === "ja") return ja_campaignstepedit2(inputs)
	if (locale === "ko") return ko_campaignstepedit2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepedit2(inputs)
	if (locale === "de") return de_campaignstepedit2(inputs)
	if (locale === "fr") return fr_campaignstepedit2(inputs)
	if (locale === "uk") return uk_campaignstepedit2(inputs)
	return en_campaignstepedit2(inputs)
});
export { campaignstepedit2 as "campaignStepEdit" }