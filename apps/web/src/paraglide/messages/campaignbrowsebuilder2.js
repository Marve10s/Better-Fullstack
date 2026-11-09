/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignbrowsebuilder2Inputs */



/**
* | output |
* | --- |
* | "Browse every stack" |
*
* @param {Campaignbrowsebuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignbrowsebuilder2 = /** @type {((inputs?: Campaignbrowsebuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignbrowsebuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Explorar todos los stacks")
	if (locale === "zh") return /** @type {LocalizedString} */ ("浏览所有技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべてのスタックを見る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 스택 둘러보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("瀏覽所有技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Alle Stacks durchstöbern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Parcourir tous les stacks")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути всі стеки")
	return /** @type {LocalizedString} */ ("Browse every stack")
});
export { campaignbrowsebuilder2 as "campaignBrowseBuilder" }