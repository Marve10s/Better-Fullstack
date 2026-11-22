/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepdownloadcopy3Inputs */



/**
* | output |
* | --- |
* | "Download a normal ZIP whenever you are ready. Better Fullstack is not your storage provider." |
*
* @param {Campaignstepdownloadcopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepdownloadcopy3 = /** @type {((inputs?: Campaignstepdownloadcopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepdownloadcopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Descarga un ZIP normal cuando quieras. Better Fullstack no es tu proveedor de almacenamiento.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("随时下载一个普通的 ZIP。Better Fullstack 不是你的存储服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("準備ができたら通常の ZIP をダウンロード。Better Fullstack はあなたのストレージではありません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("준비되면 일반 ZIP으로 다운로드하세요. Better Fullstack은 스토리지 서비스가 아닙니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("隨時下載一個普通的 ZIP。Better Fullstack 不是你的儲存服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Lade jederzeit ein ganz normales ZIP herunter. Better Fullstack ist nicht dein Speicheranbieter.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Téléchargez un ZIP classique quand vous êtes prêt. Better Fullstack n'est pas votre hébergeur de code.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантажте звичайний ZIP, коли будете готові. Better Fullstack - не ваше сховище коду.")
	return /** @type {LocalizedString} */ ("Download a normal ZIP whenever you are ready. Better Fullstack is not your storage provider.")
});
export { campaignstepdownloadcopy3 as "campaignStepDownloadCopy" }