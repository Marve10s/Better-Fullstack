/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernext1Inputs */



/**
* | output |
* | --- |
* | "Next" |
*
* @param {Buildernext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernext1 = /** @type {((inputs?: Buildernext1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernext1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Siguiente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("下一步")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("下一步")
	if (locale === "de") return /** @type {LocalizedString} */ ("Weiter")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Suivant")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Далі")
	return /** @type {LocalizedString} */ ("Next")
});
export { buildernext1 as "builderNext" }