/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navtemplates1Inputs */

const en_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Templates`)
};

const es_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantillas`)
};

const zh_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`模板`)
};

const ja_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テンプレート`)
};

const ko_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`템플릿`)
};

const zh_hant1_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`範本`)
};

const de_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorlagen`)
};

const fr_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modèles`)
};

const uk_navtemplates1 = /** @type {(inputs: Navtemplates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Шаблони`)
};

/**
* | output |
* | --- |
* | "Templates" |
*
* @param {Navtemplates1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navtemplates1 = /** @type {((inputs?: Navtemplates1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navtemplates1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navtemplates1(inputs)
	if (locale === "zh") return zh_navtemplates1(inputs)
	if (locale === "ja") return ja_navtemplates1(inputs)
	if (locale === "ko") return ko_navtemplates1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navtemplates1(inputs)
	if (locale === "de") return de_navtemplates1(inputs)
	if (locale === "fr") return fr_navtemplates1(inputs)
	if (locale === "uk") return uk_navtemplates1(inputs)
	return en_navtemplates1(inputs)
});
export { navtemplates1 as "navTemplates" }