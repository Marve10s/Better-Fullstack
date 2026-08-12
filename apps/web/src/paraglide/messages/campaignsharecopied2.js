/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopied2Inputs */

const en_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share message copied`)
};

const es_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mensaje para compartir copiado`)
};

const zh_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享内容已复制`)
};

const ja_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有メッセージをコピーしました`)
};

const ko_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 메시지를 복사했습니다`)
};

const zh_hant1_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享內容已複製`)
};

const de_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share-Nachricht kopiert`)
};

const fr_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message de partage copié`)
};

const uk_campaignsharecopied2 = /** @type {(inputs: Campaignsharecopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Повідомлення для шерингу скопійовано`)
};

/**
* | output |
* | --- |
* | "Share message copied" |
*
* @param {Campaignsharecopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharecopied2 = /** @type {((inputs?: Campaignsharecopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharecopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignsharecopied2(inputs)
	if (locale === "zh") return zh_campaignsharecopied2(inputs)
	if (locale === "ja") return ja_campaignsharecopied2(inputs)
	if (locale === "ko") return ko_campaignsharecopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharecopied2(inputs)
	if (locale === "de") return de_campaignsharecopied2(inputs)
	if (locale === "fr") return fr_campaignsharecopied2(inputs)
	if (locale === "uk") return uk_campaignsharecopied2(inputs)
	return en_campaignsharecopied2(inputs)
});
export { campaignsharecopied2 as "campaignShareCopied" }