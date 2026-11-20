/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewshowwarnings3Inputs */



/**
* | output |
* | --- |
* | "show" |
*
* @param {Builderpreviewshowwarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewshowwarnings3 = /** @type {((inputs?: Builderpreviewshowwarnings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewshowwarnings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("mostrar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("显示")
	if (locale === "ja") return /** @type {LocalizedString} */ ("表示")
	if (locale === "ko") return /** @type {LocalizedString} */ ("보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("顯示")
	if (locale === "de") return /** @type {LocalizedString} */ ("zeigen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("montrer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("показати")
	return /** @type {LocalizedString} */ ("show")
});
export { builderpreviewshowwarnings3 as "builderPreviewShowWarnings" }