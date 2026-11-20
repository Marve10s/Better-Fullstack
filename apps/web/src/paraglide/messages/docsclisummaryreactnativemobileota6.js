/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobileota6Inputs */



/**
* | output |
* | --- |
* | "Over-the-air updates." |
*
* @param {Docsclisummaryreactnativemobileota6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobileota6 = /** @type {((inputs?: Docsclisummaryreactnativemobileota6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobileota6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizaciones remotas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("OTA 热更新。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("OTA アップデート。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("OTA 업데이트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("OTA 更新。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Updates aus der Ferne.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mises à jour à distance.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дистанційні оновлення.")
	return /** @type {LocalizedString} */ ("Over-the-air updates.")
});
export { docsclisummaryreactnativemobileota6 as "docsCliSummaryReactNativeMobileOta" }