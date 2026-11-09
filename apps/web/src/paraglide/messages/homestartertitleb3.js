/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartertitleb3Inputs */



/**
* | output |
* | --- |
* | "next project?" |
*
* @param {Homestartertitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartertitleb3 = /** @type {((inputs?: Homestartertitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartertitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("próximo proyecto?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("项目是什么？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("何ですか？")
	if (locale === "ko") return /** @type {LocalizedString} */ ("무엇인가요?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("專案是什麼？")
	if (locale === "de") return /** @type {LocalizedString} */ ("nächstes Projekt?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("prochain projet ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("наступний проєкт?")
	return /** @type {LocalizedString} */ ("next project?")
});
export { homestartertitleb3 as "homeStarterTitleB" }