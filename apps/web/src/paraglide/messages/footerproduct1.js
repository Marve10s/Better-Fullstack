/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerproduct1Inputs */

const en_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Product`)
};

const es_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Producto`)
};

const zh_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`产品`)
};

const ja_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロダクト`)
};

const ko_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로덕트`)
};

const zh_hant1_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產品`)
};

const de_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Produkt`)
};

const fr_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Produit`)
};

const uk_footerproduct1 = /** @type {(inputs: Footerproduct1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Продукт`)
};

/**
* | output |
* | --- |
* | "Product" |
*
* @param {Footerproduct1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerproduct1 = /** @type {((inputs?: Footerproduct1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerproduct1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_footerproduct1(inputs)
	if (locale === "zh") return zh_footerproduct1(inputs)
	if (locale === "ja") return ja_footerproduct1(inputs)
	if (locale === "ko") return ko_footerproduct1(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerproduct1(inputs)
	if (locale === "de") return de_footerproduct1(inputs)
	if (locale === "fr") return fr_footerproduct1(inputs)
	if (locale === "uk") return uk_footerproduct1(inputs)
	return en_footerproduct1(inputs)
});
export { footerproduct1 as "footerProduct" }