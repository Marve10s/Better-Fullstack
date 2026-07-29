/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharedownloadcomplete3Inputs */

const en_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP downloaded`)
};

const es_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP descargado`)
};

const zh_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP 已下载`)
};

const ja_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP をダウンロードしました`)
};

const ko_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP 다운로드 완료`)
};

const zh_hant1_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP 已下載`)
};

const de_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP heruntergeladen`)
};

const fr_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP téléchargé`)
};

const uk_campaignsharedownloadcomplete3 = /** @type {(inputs: Campaignsharedownloadcomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP завантажено`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsharedownloadcomplete3(inputs)
	if (locale === "es") return es_campaignsharedownloadcomplete3(inputs)
	if (locale === "zh") return zh_campaignsharedownloadcomplete3(inputs)
	if (locale === "ja") return ja_campaignsharedownloadcomplete3(inputs)
	if (locale === "ko") return ko_campaignsharedownloadcomplete3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharedownloadcomplete3(inputs)
	if (locale === "de") return de_campaignsharedownloadcomplete3(inputs)
	if (locale === "fr") return fr_campaignsharedownloadcomplete3(inputs)
	return uk_campaignsharedownloadcomplete3(inputs)
});
export { campaignsharedownloadcomplete3 as "campaignShareDownloadComplete" }