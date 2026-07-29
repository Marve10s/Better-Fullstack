/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunthisstack3Inputs */

const en_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run this stack`)
};

const es_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar este stack`)
};

const zh_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行这个技术栈`)
};

const ja_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックを実行`)
};

const ko_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택 실행하기`)
};

const zh_hant1_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行這個技術棧`)
};

const de_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diesen Stack ausführen`)
};

const fr_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter ce stack`)
};

const uk_campaignrunthisstack3 = /** @type {(inputs: Campaignrunthisstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити цей стек`)
};

/**
* | output |
* | --- |
* | "Run this stack" |
*
* @param {Campaignrunthisstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunthisstack3 = /** @type {((inputs?: Campaignrunthisstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunthisstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignrunthisstack3(inputs)
	if (locale === "es") return es_campaignrunthisstack3(inputs)
	if (locale === "zh") return zh_campaignrunthisstack3(inputs)
	if (locale === "ja") return ja_campaignrunthisstack3(inputs)
	if (locale === "ko") return ko_campaignrunthisstack3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignrunthisstack3(inputs)
	if (locale === "de") return de_campaignrunthisstack3(inputs)
	if (locale === "fr") return fr_campaignrunthisstack3(inputs)
	return uk_campaignrunthisstack3(inputs)
});
export { campaignrunthisstack3 as "campaignRunThisStack" }