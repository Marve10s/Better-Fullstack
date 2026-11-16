/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharedownloadcomplete3Inputs */



/**
* | output |
* | --- |
* | "ZIP downloaded" |
*
* @param {Campaignsharedownloadcomplete3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharedownloadcomplete3 = /** @type {((inputs?: Campaignsharedownloadcomplete3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharedownloadcomplete3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ZIP descargado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("ZIP 已下载")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ZIP をダウンロードしました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ZIP 다운로드 완료")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("ZIP 已下載")
	if (locale === "de") return /** @type {LocalizedString} */ ("ZIP heruntergeladen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("ZIP téléchargé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("ZIP завантажено")
	return /** @type {LocalizedString} */ ("ZIP downloaded")
});
export { campaignsharedownloadcomplete3 as "campaignShareDownloadComplete" }