/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navhome1Inputs */

const en_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack home`)
};

const es_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicio de Better Fullstack`)
};

const zh_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 首页`)
};

const ja_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack ホーム`)
};

const ko_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 집`)
};

const zh_hant1_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 首頁`)
};

const de_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack Zuhause`)
};

const fr_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack domicile`)
};

/**
* | output |
* | --- |
* | "Better Fullstack home" |
*
* @param {Navhome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navhome1 = /** @type {((inputs?: Navhome1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navhome1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navhome1(inputs)
	if (locale === "es") return es_navhome1(inputs)
	if (locale === "zh") return zh_navhome1(inputs)
	if (locale === "ja") return ja_navhome1(inputs)
	if (locale === "ko") return ko_navhome1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navhome1(inputs)
	if (locale === "de") return de_navhome1(inputs)
	return fr_navhome1(inputs)
});
export { navhome1 as "navHome" }