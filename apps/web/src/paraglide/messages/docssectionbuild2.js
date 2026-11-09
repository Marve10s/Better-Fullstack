/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionbuild2Inputs */



/**
* | output |
* | --- |
* | "Build" |
*
* @param {Docssectionbuild2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionbuild2 = /** @type {((inputs?: Docssectionbuild2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionbuild2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Construir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建")
	if (locale === "ja") return /** @type {LocalizedString} */ ("構築")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erstellen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Construire")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створення")
	return /** @type {LocalizedString} */ ("Build")
});
export { docssectionbuild2 as "docsSectionBuild" }