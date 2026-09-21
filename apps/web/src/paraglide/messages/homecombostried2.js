/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombostried2Inputs */

const en_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tried since you got here`)
};

const es_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`probados desde que llegaste`)
};

const zh_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自你到来后已尝试`)
};

const ja_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ここに来てから試した数`)
};

const ko_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`방문한 뒤 시도한 수`)
};

const zh_hant1_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自你到來後已嘗試`)
};

const de_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`getestet, seit du hier bist`)
};

const fr_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`essayés depuis votre arrivée`)
};

const uk_homecombostried2 = /** @type {(inputs: Homecombostried2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`перевірено, відколи ви тут`)
};

/**
* | output |
* | --- |
* | "tried since you got here" |
*
* @param {Homecombostried2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombostried2 = /** @type {((inputs?: Homecombostried2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombostried2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombostried2(inputs)
	if (locale === "zh") return zh_homecombostried2(inputs)
	if (locale === "ja") return ja_homecombostried2(inputs)
	if (locale === "ko") return ko_homecombostried2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombostried2(inputs)
	if (locale === "de") return de_homecombostried2(inputs)
	if (locale === "fr") return fr_homecombostried2(inputs)
	if (locale === "uk") return uk_homecombostried2(inputs)
	return en_homecombostried2(inputs)
});
export { homecombostried2 as "homeCombosTried" }