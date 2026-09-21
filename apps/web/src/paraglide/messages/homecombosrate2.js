/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosrate2Inputs */

const en_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Say each one takes 1 millisecond.`)
};

const es_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supón que cada uno tarda 1 milisegundo.`)
};

const zh_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`假设每个只需 1 毫秒。`)
};

const ja_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1つにつき1ミリ秒かかるとします。`)
};

const ko_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하나에 1밀리초가 걸린다고 해 봅시다.`)
};

const zh_hant1_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`假設每個只需 1 毫秒。`)
};

const de_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Angenommen, jeder braucht 1 Millisekunde.`)
};

const fr_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disons que chacun prend 1 milliseconde.`)
};

const uk_homecombosrate2 = /** @type {(inputs: Homecombosrate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Припустімо, кожен займає 1 мілісекунду.`)
};

/**
* | output |
* | --- |
* | "Say each one takes 1 millisecond." |
*
* @param {Homecombosrate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosrate2 = /** @type {((inputs?: Homecombosrate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosrate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homecombosrate2(inputs)
	if (locale === "zh") return zh_homecombosrate2(inputs)
	if (locale === "ja") return ja_homecombosrate2(inputs)
	if (locale === "ko") return ko_homecombosrate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecombosrate2(inputs)
	if (locale === "de") return de_homecombosrate2(inputs)
	if (locale === "fr") return fr_homecombosrate2(inputs)
	if (locale === "uk") return uk_homecombosrate2(inputs)
	return en_homecombosrate2(inputs)
});
export { homecombosrate2 as "homeCombosRate" }