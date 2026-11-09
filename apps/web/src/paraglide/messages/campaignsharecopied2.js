/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopied2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Mensaje para compartir copiado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分享内容已复制")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有メッセージをコピーしました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 메시지를 복사했습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分享內容已複製")
	if (locale === "de") return /** @type {LocalizedString} */ ("Share-Nachricht kopiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Message de partage copié")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Повідомлення для шерингу скопійовано")
	return /** @type {LocalizedString} */ ("Share message copied")
});
export { campaignsharecopied2 as "campaignShareCopied" }