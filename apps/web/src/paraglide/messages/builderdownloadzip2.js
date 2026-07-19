/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadzip2Inputs */

const en_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download ZIP`)
};

const es_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Descargar ZIP`)
};

const zh_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下载 ZIP`)
};

const ja_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIPをダウンロード`)
};

const ko_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP 다운로드`)
};

const zh_hant1_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下載 ZIP`)
};

const de_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP herunterladen`)
};

const fr_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Télécharger le ZIP`)
};

const uk_builderdownloadzip2 = /** @type {(inputs: Builderdownloadzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Завантажити ZIP`)
};

/**
* | output |
* | --- |
* | "Download ZIP" |
*
* @param {Builderdownloadzip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadzip2 = /** @type {((inputs?: Builderdownloadzip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadzip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdownloadzip2(inputs)
	if (locale === "es") return es_builderdownloadzip2(inputs)
	if (locale === "zh") return zh_builderdownloadzip2(inputs)
	if (locale === "ja") return ja_builderdownloadzip2(inputs)
	if (locale === "ko") return ko_builderdownloadzip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdownloadzip2(inputs)
	if (locale === "de") return de_builderdownloadzip2(inputs)
	if (locale === "fr") return fr_builderdownloadzip2(inputs)
	return uk_builderdownloadzip2(inputs)
});
export { builderdownloadzip2 as "builderDownloadZip" }