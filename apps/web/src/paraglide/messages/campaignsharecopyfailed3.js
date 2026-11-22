/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharecopyfailed3Inputs */



/**
* | output |
* | --- |
* | "Could not copy the share message" |
*
* @param {Campaignsharecopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharecopyfailed3 = /** @type {((inputs?: Campaignsharecopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharecopyfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo copiar el mensaje")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无法复制分享内容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有メッセージをコピーできませんでした")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 메시지를 복사하지 못했습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法複製分享內容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Share-Nachricht konnte nicht kopiert werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Impossible de copier le message de partage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося скопіювати повідомлення")
	return /** @type {LocalizedString} */ ("Could not copy the share message")
});
export { campaignsharecopyfailed3 as "campaignShareCopyFailed" }