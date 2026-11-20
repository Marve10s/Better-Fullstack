/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewhidewarnings3Inputs */



/**
* | output |
* | --- |
* | "hide" |
*
* @param {Builderpreviewhidewarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewhidewarnings3 = /** @type {((inputs?: Builderpreviewhidewarnings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewhidewarnings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ocultar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("隐藏")
	if (locale === "ja") return /** @type {LocalizedString} */ ("非表示")
	if (locale === "ko") return /** @type {LocalizedString} */ ("숨기기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("隱藏")
	if (locale === "de") return /** @type {LocalizedString} */ ("verstecken")
	if (locale === "fr") return /** @type {LocalizedString} */ ("cacher")
	if (locale === "uk") return /** @type {LocalizedString} */ ("приховати")
	return /** @type {LocalizedString} */ ("hide")
});
export { builderpreviewhidewarnings3 as "builderPreviewHideWarnings" }