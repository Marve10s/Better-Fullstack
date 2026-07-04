/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeinstall1Inputs */

const en_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`install`)
};

const es_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`instalar`)
};

const zh_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装`)
};

const ja_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`インストール`)
};

const ko_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설치하다`)
};

const zh_hant1_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安裝`)
};

const de_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`installieren`)
};

const fr_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`installer`)
};

const uk_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`встановити`)
};

/**
* | output |
* | --- |
* | "install" |
*
* @param {Homeinstall1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeinstall1 = /** @type {((inputs?: Homeinstall1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeinstall1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeinstall1(inputs)
	if (locale === "es") return es_homeinstall1(inputs)
	if (locale === "zh") return zh_homeinstall1(inputs)
	if (locale === "ja") return ja_homeinstall1(inputs)
	if (locale === "ko") return ko_homeinstall1(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeinstall1(inputs)
	if (locale === "de") return de_homeinstall1(inputs)
	if (locale === "fr") return fr_homeinstall1(inputs)
	return uk_homeinstall1(inputs)
});
export { homeinstall1 as "homeInstall" }