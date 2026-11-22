/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerbuiltby2Inputs */



/**
* | output |
* | --- |
* | "Built by" |
*
* @param {Footerbuiltby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerbuiltby2 = /** @type {((inputs?: Footerbuiltby2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerbuiltby2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Construido por")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建者")
	if (locale === "ja") return /** @type {LocalizedString} */ ("制作:")
	if (locale === "ko") return /** @type {LocalizedString} */ ("만든 사람")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構者")
	if (locale === "de") return /** @type {LocalizedString} */ ("Gebaut von")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Construit par")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створено")
	return /** @type {LocalizedString} */ ("Built by")
});
export { footerbuiltby2 as "footerBuiltBy" }