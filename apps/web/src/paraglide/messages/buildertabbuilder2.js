/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabbuilder2Inputs */



/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Buildertabbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertabbuilder2 = /** @type {((inputs?: Buildertabbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Constructor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルダー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌더")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Builder")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Constructeur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Конструктор")
	return /** @type {LocalizedString} */ ("Builder")
});
export { buildertabbuilder2 as "builderTabBuilder" }