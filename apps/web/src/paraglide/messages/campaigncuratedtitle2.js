/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedtitle2Inputs */



/**
* | output |
* | --- |
* | "Pick one. Break it. Keep it." |
*
* @param {Campaigncuratedtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncuratedtitle2 = /** @type {((inputs?: Campaigncuratedtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncuratedtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Elige uno. Rómpelo. Quédatelo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("选一个。折腾它。留下它。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("選んで、壊して、自分のものに。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("하나 골라서, 부수고, 가지세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選一個。玩壞它。留下它。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wähle einen. Zerlege ihn. Behalte ihn.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Choisissez-en un. Cassez-le. Gardez-le.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оберіть один. Зламайте його. Залиште собі.")
	return /** @type {LocalizedString} */ ("Pick one. Break it. Keep it.")
});
export { campaigncuratedtitle2 as "campaignCuratedTitle" }