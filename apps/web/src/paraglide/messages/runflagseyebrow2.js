/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagseyebrow2Inputs */

const en_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flags`)
};

const es_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flags`)
};

const zh_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令行参数`)
};

const ja_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フラグ`)
};

const ko_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`플래그`)
};

const zh_hant1_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`旗標`)
};

const de_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flags`)
};

const fr_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Indicateurs`)
};

const uk_runflagseyebrow2 = /** @type {(inputs: Runflagseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Прапори`)
};

/**
* | output |
* | --- |
* | "Flags" |
*
* @param {Runflagseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runflagseyebrow2 = /** @type {((inputs?: Runflagseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runflagseyebrow2(inputs)
	if (locale === "zh") return zh_runflagseyebrow2(inputs)
	if (locale === "ja") return ja_runflagseyebrow2(inputs)
	if (locale === "ko") return ko_runflagseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagseyebrow2(inputs)
	if (locale === "de") return de_runflagseyebrow2(inputs)
	if (locale === "fr") return fr_runflagseyebrow2(inputs)
	if (locale === "uk") return uk_runflagseyebrow2(inputs)
	return en_runflagseyebrow2(inputs)
});
export { runflagseyebrow2 as "runFlagsEyebrow" }