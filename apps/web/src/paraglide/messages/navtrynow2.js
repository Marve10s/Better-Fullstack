/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navtrynow2Inputs */

const en_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try now`)
};

const es_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probar ahora`)
};

const zh_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`立即试用`)
};

const ja_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`今すぐ試す`)
};

const ko_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지금 사용해 보세요`)
};

const zh_hant1_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`立即試用`)
};

const de_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jetzt ausprobieren`)
};

const fr_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Essayez maintenant`)
};

const uk_navtrynow2 = /** @type {(inputs: Navtrynow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спробувати`)
};

/**
* | output |
* | --- |
* | "Try now" |
*
* @param {Navtrynow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navtrynow2 = /** @type {((inputs?: Navtrynow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navtrynow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navtrynow2(inputs)
	if (locale === "zh") return zh_navtrynow2(inputs)
	if (locale === "ja") return ja_navtrynow2(inputs)
	if (locale === "ko") return ko_navtrynow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navtrynow2(inputs)
	if (locale === "de") return de_navtrynow2(inputs)
	if (locale === "fr") return fr_navtrynow2(inputs)
	if (locale === "uk") return uk_navtrynow2(inputs)
	return en_navtrynow2(inputs)
});
export { navtrynow2 as "navTryNow" }