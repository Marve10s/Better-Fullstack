/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharetitle2Inputs */

const en_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This stack is ready to share`)
};

const es_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Este stack está listo para compartir`)
};

const zh_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个技术栈已可分享`)
};

const ja_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックを共有できます`)
};

const ko_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택을 공유할 준비가 되었습니다`)
};

const zh_hant1_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`這個技術棧已可分享`)
};

const de_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dieser Stack ist bereit zum Teilen`)
};

const fr_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ce stack est prêt à être partagé`)
};

const uk_campaignsharetitle2 = /** @type {(inputs: Campaignsharetitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цей стек готовий, щоб ним поділитися`)
};

/**
* | output |
* | --- |
* | "This stack is ready to share" |
*
* @param {Campaignsharetitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharetitle2 = /** @type {((inputs?: Campaignsharetitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharetitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignsharetitle2(inputs)
	if (locale === "zh") return zh_campaignsharetitle2(inputs)
	if (locale === "ja") return ja_campaignsharetitle2(inputs)
	if (locale === "ko") return ko_campaignsharetitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharetitle2(inputs)
	if (locale === "de") return de_campaignsharetitle2(inputs)
	if (locale === "fr") return fr_campaignsharetitle2(inputs)
	if (locale === "uk") return uk_campaignsharetitle2(inputs)
	return en_campaignsharetitle2(inputs)
});
export { campaignsharetitle2 as "campaignShareTitle" }