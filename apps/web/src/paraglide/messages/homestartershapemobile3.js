/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapemobile3Inputs */



/**
* | output |
* | --- |
* | "Mobile app" |
*
* @param {Homestartershapemobile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapemobile3 = /** @type {((inputs?: Homestartershapemobile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapemobile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("App móvil")
	if (locale === "zh") return /** @type {LocalizedString} */ ("移动应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モバイルアプリ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모바일 앱")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("行動應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mobile App")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application mobile")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мобільний застосунок")
	return /** @type {LocalizedString} */ ("Mobile app")
});
export { homestartershapemobile3 as "homeStarterShapeMobile" }