/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnext1Inputs */



/**
* | output |
* | --- |
* | "Next" |
*
* @param {Docsnext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsnext1 = /** @type {((inputs?: Docsnext1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsnext1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Siguiente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("下一页")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("下一頁")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nächste")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Suivant")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Далі")
	return /** @type {LocalizedString} */ ("Next")
});
export { docsnext1 as "docsNext" }