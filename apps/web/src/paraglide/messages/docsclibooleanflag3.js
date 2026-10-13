/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclibooleanflag3Inputs */

const en_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`boolean flag`)
};

const es_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`flag booleano`)
};

const zh_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`布尔参数`)
};

const ja_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブール型フラグ`)
};

const ko_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`불리언 플래그`)
};

const zh_hant1_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`布林旗標`)
};

const de_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`boolesches Flag`)
};

const fr_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`option booléenne`)
};

const uk_docsclibooleanflag3 = /** @type {(inputs: Docsclibooleanflag3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`булевий прапорець`)
};

/**
* | output |
* | --- |
* | "boolean flag" |
*
* @param {Docsclibooleanflag3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclibooleanflag3 = /** @type {((inputs?: Docsclibooleanflag3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclibooleanflag3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclibooleanflag3(inputs)
	if (locale === "zh") return zh_docsclibooleanflag3(inputs)
	if (locale === "ja") return ja_docsclibooleanflag3(inputs)
	if (locale === "ko") return ko_docsclibooleanflag3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclibooleanflag3(inputs)
	if (locale === "de") return de_docsclibooleanflag3(inputs)
	if (locale === "fr") return fr_docsclibooleanflag3(inputs)
	if (locale === "uk") return uk_docsclibooleanflag3(inputs)
	return en_docsclibooleanflag3(inputs)
});
export { docsclibooleanflag3 as "docsCliBooleanFlag" }