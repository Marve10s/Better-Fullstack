/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepdownload2Inputs */

const en_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Take the code`)
};

const es_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Llévate el código`)
};

const zh_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`带走代码`)
};

const ja_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コードを持ち帰る`)
};

const ko_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`코드 가져가기`)
};

const zh_hant1_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`帶走程式碼`)
};

const de_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nimm den Code mit`)
};

const fr_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Emportez le code`)
};

const uk_campaignstepdownload2 = /** @type {(inputs: Campaignstepdownload2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Заберіть код`)
};

/**
* | output |
* | --- |
* | "Take the code" |
*
* @param {Campaignstepdownload2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepdownload2 = /** @type {((inputs?: Campaignstepdownload2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepdownload2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepdownload2(inputs)
	if (locale === "es") return es_campaignstepdownload2(inputs)
	if (locale === "zh") return zh_campaignstepdownload2(inputs)
	if (locale === "ja") return ja_campaignstepdownload2(inputs)
	if (locale === "ko") return ko_campaignstepdownload2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepdownload2(inputs)
	if (locale === "de") return de_campaignstepdownload2(inputs)
	if (locale === "fr") return fr_campaignstepdownload2(inputs)
	return uk_campaignstepdownload2(inputs)
});
export { campaignstepdownload2 as "campaignStepDownload" }