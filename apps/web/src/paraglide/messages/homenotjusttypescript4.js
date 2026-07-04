/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homenotjusttypescript4Inputs */

const en_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not just TypeScript.`)
};

const es_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No solo TypeScript.`)
};

const zh_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不只是 TypeScript。`)
};

const ja_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript だけではありません。`)
};

const ko_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript 뿐만이 아닙니다.`)
};

const zh_hant1_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不只是 TypeScript。`)
};

const de_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht nur TypeScript.`)
};

const fr_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pas seulement TypeScript.`)
};

const uk_homenotjusttypescript4 = /** @type {(inputs: Homenotjusttypescript4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не тільки TypeScript.`)
};

/**
* | output |
* | --- |
* | "Not just TypeScript." |
*
* @param {Homenotjusttypescript4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homenotjusttypescript4 = /** @type {((inputs?: Homenotjusttypescript4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homenotjusttypescript4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homenotjusttypescript4(inputs)
	if (locale === "es") return es_homenotjusttypescript4(inputs)
	if (locale === "zh") return zh_homenotjusttypescript4(inputs)
	if (locale === "ja") return ja_homenotjusttypescript4(inputs)
	if (locale === "ko") return ko_homenotjusttypescript4(inputs)
	if (locale === "zh-Hant") return zh_hant1_homenotjusttypescript4(inputs)
	if (locale === "de") return de_homenotjusttypescript4(inputs)
	if (locale === "fr") return fr_homenotjusttypescript4(inputs)
	return uk_homenotjusttypescript4(inputs)
});
export { homenotjusttypescript4 as "homeNotJustTypeScript" }