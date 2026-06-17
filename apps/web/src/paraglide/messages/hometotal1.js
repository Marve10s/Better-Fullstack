/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometotal1Inputs */

const en_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`total`)
};

const es_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`total`)
};

const zh_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`总计`)
};

const ja_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`合計`)
};

const ko_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`총`)
};

const zh_hant1_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`總計`)
};

const de_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`gesamt`)
};

const fr_hometotal1 = /** @type {(inputs: Hometotal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`total`)
};

/**
* | output |
* | --- |
* | "total" |
*
* @param {Hometotal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometotal1 = /** @type {((inputs?: Hometotal1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotal1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotal1(inputs)
	if (locale === "es") return es_hometotal1(inputs)
	if (locale === "zh") return zh_hometotal1(inputs)
	if (locale === "ja") return ja_hometotal1(inputs)
	if (locale === "ko") return ko_hometotal1(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometotal1(inputs)
	if (locale === "de") return de_hometotal1(inputs)
	return fr_hometotal1(inputs)
});
export { hometotal1 as "homeTotal" }