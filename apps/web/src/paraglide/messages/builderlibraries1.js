/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlibraries1Inputs */



/**
* | output |
* | --- |
* | "Libraries" |
*
* @param {Builderlibraries1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlibraries1 = /** @type {((inputs?: Builderlibraries1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlibraries1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Librerías")
	if (locale === "zh") return /** @type {LocalizedString} */ ("库")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ライブラリ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("라이브러리")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("庫")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bibliotheken")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèques")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотеки")
	return /** @type {LocalizedString} */ ("Libraries")
});
export { builderlibraries1 as "builderLibraries" }