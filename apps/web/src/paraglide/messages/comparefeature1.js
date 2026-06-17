/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparefeature1Inputs */

const en_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feature`)
};

const es_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Función`)
};

const zh_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能`)
};

const ja_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`特徴`)
};

const ko_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`특징`)
};

const zh_hant1_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能`)
};

const de_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Besonderheit`)
};

const fr_comparefeature1 = /** @type {(inputs: Comparefeature1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fonctionnalité`)
};

/**
* | output |
* | --- |
* | "Feature" |
*
* @param {Comparefeature1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparefeature1 = /** @type {((inputs?: Comparefeature1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparefeature1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparefeature1(inputs)
	if (locale === "es") return es_comparefeature1(inputs)
	if (locale === "zh") return zh_comparefeature1(inputs)
	if (locale === "ja") return ja_comparefeature1(inputs)
	if (locale === "ko") return ko_comparefeature1(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparefeature1(inputs)
	if (locale === "de") return de_comparefeature1(inputs)
	return fr_comparefeature1(inputs)
});
export { comparefeature1 as "compareFeature" }