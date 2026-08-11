/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcprunterminal2Inputs */

const en_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run in your terminal`)
};

const es_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecutar en la terminal`)
};

const zh_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在终端运行`)
};

const ja_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ターミナルで実行します`)
};

const ko_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`터미널에서 실행`)
};

const zh_hant1_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在終端機執行`)
};

const de_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`in Ihrem Terminal ausführen`)
};

const fr_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`exécuter dans votre terminal`)
};

const uk_mcprunterminal2 = /** @type {(inputs: Mcprunterminal2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`запустіть у терміналі`)
};

/**
* | output |
* | --- |
* | "run in your terminal" |
*
* @param {Mcprunterminal2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcprunterminal2 = /** @type {((inputs?: Mcprunterminal2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcprunterminal2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcprunterminal2(inputs)
	if (locale === "zh") return zh_mcprunterminal2(inputs)
	if (locale === "ja") return ja_mcprunterminal2(inputs)
	if (locale === "ko") return ko_mcprunterminal2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcprunterminal2(inputs)
	if (locale === "de") return de_mcprunterminal2(inputs)
	if (locale === "fr") return fr_mcprunterminal2(inputs)
	if (locale === "uk") return uk_mcprunterminal2(inputs)
	return en_mcprunterminal2(inputs)
});
export { mcprunterminal2 as "mcpRunTerminal" }