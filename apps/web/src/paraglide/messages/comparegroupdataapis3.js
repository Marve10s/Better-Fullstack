/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupdataapis3Inputs */



/**
* | output |
* | --- |
* | "Data & APIs" |
*
* @param {Comparegroupdataapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparegroupdataapis3 = /** @type {((inputs?: Comparegroupdataapis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupdataapis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Datos y APIs")
	if (locale === "zh") return /** @type {LocalizedString} */ ("数据与 API")
	if (locale === "ja") return /** @type {LocalizedString} */ ("データと API")
	if (locale === "ko") return /** @type {LocalizedString} */ ("데이터 및 APIs")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("資料與 API")
	if (locale === "de") return /** @type {LocalizedString} */ ("Daten & APIs")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Données et API")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дані та API")
	return /** @type {LocalizedString} */ ("Data & APIs")
});
export { comparegroupdataapis3 as "compareGroupDataApis" }