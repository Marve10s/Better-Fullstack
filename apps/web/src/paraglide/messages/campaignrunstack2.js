/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignrunstack2Inputs */

const en_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run a stack`)
};

const es_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar un stack`)
};

const zh_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行一个技术栈`)
};

const ja_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックを実行`)
};

const ko_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 실행하기`)
};

const zh_hant1_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行一個技術棧`)
};

const de_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack ausführen`)
};

const fr_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter un stack`)
};

const uk_campaignrunstack2 = /** @type {(inputs: Campaignrunstack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити стек`)
};

/**
* | output |
* | --- |
* | "Run a stack" |
*
* @param {Campaignrunstack2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignrunstack2 = /** @type {((inputs?: Campaignrunstack2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignrunstack2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignrunstack2(inputs)
	if (locale === "es") return es_campaignrunstack2(inputs)
	if (locale === "zh") return zh_campaignrunstack2(inputs)
	if (locale === "ja") return ja_campaignrunstack2(inputs)
	if (locale === "ko") return ko_campaignrunstack2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignrunstack2(inputs)
	if (locale === "de") return de_campaignrunstack2(inputs)
	if (locale === "fr") return fr_campaignrunstack2(inputs)
	return uk_campaignrunstack2(inputs)
});
export { campaignrunstack2 as "campaignRunStack" }