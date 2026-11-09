/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionmobile3Inputs */



/**
* | output |
* | --- |
* | "Mobile" |
*
* @param {Builderlanguagesectionmobile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionmobile3 = /** @type {((inputs?: Builderlanguagesectionmobile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionmobile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Móvil")
	if (locale === "zh") return /** @type {LocalizedString} */ ("移动端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モバイル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모바일")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("行動裝置")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mobile")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mobile")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Мобільні")
	return /** @type {LocalizedString} */ ("Mobile")
});
export { builderlanguagesectionmobile3 as "builderLanguageSectionMobile" }