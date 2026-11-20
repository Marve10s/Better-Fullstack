/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopylink3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar texto para compartir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制分享文本")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有テキストをコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 텍스트 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製分享文字")
	if (locale === "de") return /** @type {LocalizedString} */ ("Share-Text kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier le texte de partage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скопіювати текст для шерингу")
	return /** @type {LocalizedString} */ ("Copy share text")
});
export { campaignsharecopylink3 as "campaignShareCopyLink" }