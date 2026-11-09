/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasname3Inputs */



/**
* | output |
* | --- |
* | "SaaS App" |
*
* @param {Presettracksaasname3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettracksaasname3 = /** @type {((inputs?: Presettracksaasname3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasname3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("App SaaS")
	if (locale === "zh") return /** @type {LocalizedString} */ ("SaaS 应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("SaaS アプリ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("SaaS 앱")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("SaaS 應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("SaaS-App")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Application SaaS")
	if (locale === "uk") return /** @type {LocalizedString} */ ("SaaS-застосунок")
	return /** @type {LocalizedString} */ ("SaaS App")
});
export { presettracksaasname3 as "presetTrackSaasName" }