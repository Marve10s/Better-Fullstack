/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ fileName: NonNullable<unknown> }} Builderdownloadcomplete2Inputs */

const en_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Downloaded ${i?.fileName}`)
};

const es_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Se descargó ${i?.fileName}`)
};

const zh_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已下载 ${i?.fileName}`)
};

const ja_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName}をダウンロードしました`)
};

const ko_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} 다운로드 완료`)
};

const zh_hant1_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已下載 ${i?.fileName}`)
};

const de_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} wurde heruntergeladen`)
};

const fr_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.fileName} a été téléchargé`)
};

const uk_builderdownloadcomplete2 = /** @type {(inputs: Builderdownloadcomplete2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Завантажено ${i?.fileName}`)
};

/**
* | output |
* | --- |
* | "Downloaded {fileName}" |
*
* @param {Builderdownloadcomplete2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadcomplete2 = /** @type {((inputs: Builderdownloadcomplete2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadcomplete2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderdownloadcomplete2(inputs)
	if (locale === "zh") return zh_builderdownloadcomplete2(inputs)
	if (locale === "ja") return ja_builderdownloadcomplete2(inputs)
	if (locale === "ko") return ko_builderdownloadcomplete2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdownloadcomplete2(inputs)
	if (locale === "de") return de_builderdownloadcomplete2(inputs)
	if (locale === "fr") return fr_builderdownloadcomplete2(inputs)
	if (locale === "uk") return uk_builderdownloadcomplete2(inputs)
	return en_builderdownloadcomplete2(inputs)
});
export { builderdownloadcomplete2 as "builderDownloadComplete" }