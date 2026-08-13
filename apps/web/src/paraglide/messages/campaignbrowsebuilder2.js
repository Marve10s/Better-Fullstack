/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignbrowsebuilder2Inputs */

const en_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browse every stack`)
};

const es_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Explorar todos los stacks`)
};

const zh_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`浏览所有技术栈`)
};

const ja_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべてのスタックを見る`)
};

const ko_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 스택 둘러보기`)
};

const zh_hant1_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`瀏覽所有技術棧`)
};

const de_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alle Stacks durchstöbern`)
};

const fr_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Parcourir tous les stacks`)
};

const uk_campaignbrowsebuilder2 = /** @type {(inputs: Campaignbrowsebuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути всі стеки`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignbrowsebuilder2(inputs)
	if (locale === "zh") return zh_campaignbrowsebuilder2(inputs)
	if (locale === "ja") return ja_campaignbrowsebuilder2(inputs)
	if (locale === "ko") return ko_campaignbrowsebuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignbrowsebuilder2(inputs)
	if (locale === "de") return de_campaignbrowsebuilder2(inputs)
	if (locale === "fr") return fr_campaignbrowsebuilder2(inputs)
	if (locale === "uk") return uk_campaignbrowsebuilder2(inputs)
	return en_campaignbrowsebuilder2(inputs)
});
export { campaignbrowsebuilder2 as "campaignBrowseBuilder" }