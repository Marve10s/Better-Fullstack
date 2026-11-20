/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartertitlea3Inputs */



/**
* | output |
* | --- |
* | "What's your" |
*
* @param {Homestartertitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartertitlea3 = /** @type {((inputs?: Homestartertitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartertitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Cuál es tu")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你的下一个")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次のプロジェクトは")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음 프로젝트는")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你的下一個")
	if (locale === "de") return /** @type {LocalizedString} */ ("Was ist dein")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Quel est votre")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Який твій")
	return /** @type {LocalizedString} */ ("What's your")
});
export { homestartertitlea3 as "homeStarterTitleA" }