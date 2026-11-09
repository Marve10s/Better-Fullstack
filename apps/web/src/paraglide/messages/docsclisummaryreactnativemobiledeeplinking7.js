/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobiledeeplinking7Inputs */



/**
* | output |
* | --- |
* | "Deep linking." |
*
* @param {Docsclisummaryreactnativemobiledeeplinking7Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobiledeeplinking7 = /** @type {((inputs?: Docsclisummaryreactnativemobiledeeplinking7Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobiledeeplinking7Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Enlaces profundos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("深度链接。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ディープリンク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("딥 링크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("深層連結。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Deep-Linking.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Liens profonds.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Глибокі посилання.")
	return /** @type {LocalizedString} */ ("Deep linking.")
});
export { docsclisummaryreactnativemobiledeeplinking7 as "docsCliSummaryReactNativeMobileDeepLinking" }