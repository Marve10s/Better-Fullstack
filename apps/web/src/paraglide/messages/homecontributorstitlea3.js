/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorstitlea3Inputs */



/**
* | output |
* | --- |
* | "Built in public." |
*
* @param {Homecontributorstitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributorstitlea3 = /** @type {((inputs?: Homecontributorstitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorstitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Construido en público.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("公开构建。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オープンに開発。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공개적으로 구축되었습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("公開建構。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffentlich gebaut.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Construit en public.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створено відкрито.")
	return /** @type {LocalizedString} */ ("Built in public.")
});
export { homecontributorstitlea3 as "homeContributorsTitleA" }