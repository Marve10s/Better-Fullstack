/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcompare1Inputs */

const en_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compare`)
};

const es_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparar`)
};

const zh_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比较`)
};

const ja_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比較する`)
};

const ko_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비교하다`)
};

const zh_hant1_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比較`)
};

const de_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vergleichen`)
};

const fr_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparer`)
};

/**
* | output |
* | --- |
* | "Compare" |
*
* @param {Navcompare1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navcompare1 = /** @type {((inputs?: Navcompare1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcompare1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcompare1(inputs)
	if (locale === "es") return es_navcompare1(inputs)
	if (locale === "zh") return zh_navcompare1(inputs)
	if (locale === "ja") return ja_navcompare1(inputs)
	if (locale === "ko") return ko_navcompare1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcompare1(inputs)
	if (locale === "de") return de_navcompare1(inputs)
	return fr_navcompare1(inputs)
});
export { navcompare1 as "navCompare" }