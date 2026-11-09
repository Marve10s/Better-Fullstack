/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerproduct1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Producto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("产品")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロダクト")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로덕트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產品")
	if (locale === "de") return /** @type {LocalizedString} */ ("Produkt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Produit")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Продукт")
	return /** @type {LocalizedString} */ ("Product")
});
export { footerproduct1 as "footerProduct" }