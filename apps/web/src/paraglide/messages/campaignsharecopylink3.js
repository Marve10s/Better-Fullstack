/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopylink3Inputs */

const en_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy share text`)
};

const es_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar texto para compartir`)
};

const zh_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制分享文本`)
};

const ja_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有テキストをコピー`)
};

const ko_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 텍스트 복사`)
};

const zh_hant1_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製分享文字`)
};

const de_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share-Text kopieren`)
};

const fr_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le texte de partage`)
};

const uk_campaignsharecopylink3 = /** @type {(inputs: Campaignsharecopylink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скопіювати текст для шерингу`)
};

/**
* | output |
* | --- |
* | "Copy share text" |
*
* @param {Campaignsharecopylink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharecopylink3 = /** @type {((inputs?: Campaignsharecopylink3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharecopylink3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignsharecopylink3(inputs)
	if (locale === "zh") return zh_campaignsharecopylink3(inputs)
	if (locale === "ja") return ja_campaignsharecopylink3(inputs)
	if (locale === "ko") return ko_campaignsharecopylink3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharecopylink3(inputs)
	if (locale === "de") return de_campaignsharecopylink3(inputs)
	if (locale === "fr") return fr_campaignsharecopylink3(inputs)
	if (locale === "uk") return uk_campaignsharecopylink3(inputs)
	return en_campaignsharecopylink3(inputs)
});
export { campaignsharecopylink3 as "campaignShareCopyLink" }