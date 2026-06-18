/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcreationmethod2Inputs */

const en_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creation method`)
};

const es_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Método de creación`)
};

const zh_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建方式`)
};

const ja_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`作成方法`)
};

const ko_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성방법`)
};

const zh_hant1_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`創建方式`)
};

const de_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellungsmethode`)
};

const fr_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Méthode de création`)
};

/**
* | output |
* | --- |
* | "Creation method" |
*
* @param {Navcreationmethod2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navcreationmethod2 = /** @type {((inputs?: Navcreationmethod2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcreationmethod2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcreationmethod2(inputs)
	if (locale === "es") return es_navcreationmethod2(inputs)
	if (locale === "zh") return zh_navcreationmethod2(inputs)
	if (locale === "ja") return ja_navcreationmethod2(inputs)
	if (locale === "ko") return ko_navcreationmethod2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcreationmethod2(inputs)
	if (locale === "de") return de_navcreationmethod2(inputs)
	return fr_navcreationmethod2(inputs)
});
export { navcreationmethod2 as "navCreationMethod" }