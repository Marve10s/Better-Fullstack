/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedload1Inputs */

const en_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Load`)
};

const es_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargar`)
};

const zh_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载`)
};

const ja_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`負荷`)
};

const ko_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`짐`)
};

const zh_hant1_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`載入`)
};

const de_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laden`)
};

const fr_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Charger`)
};

/**
* | output |
* | --- |
* | "Load" |
*
* @param {Savedload1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedload1 = /** @type {((inputs?: Savedload1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedload1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedload1(inputs)
	if (locale === "es") return es_savedload1(inputs)
	if (locale === "zh") return zh_savedload1(inputs)
	if (locale === "ja") return ja_savedload1(inputs)
	if (locale === "ko") return ko_savedload1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedload1(inputs)
	if (locale === "de") return de_savedload1(inputs)
	return fr_savedload1(inputs)
});
export { savedload1 as "savedLoad" }