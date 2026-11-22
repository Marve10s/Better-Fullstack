/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedload1Inputs */



/**
* | output |
* | --- |
* | "Load" |
*
* @param {Savedload1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedload1 = /** @type {((inputs?: Savedload1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedload1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cargar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("加载")
	if (locale === "ja") return /** @type {LocalizedString} */ ("読み込む")
	if (locale === "ko") return /** @type {LocalizedString} */ ("불러오기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("載入")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Charger")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантажити")
	return /** @type {LocalizedString} */ ("Load")
});
export { savedload1 as "savedLoad" }