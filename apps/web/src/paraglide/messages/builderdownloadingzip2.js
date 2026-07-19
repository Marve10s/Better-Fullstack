/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadingzip2Inputs */

const en_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creating ZIP...`)
};

const es_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creando ZIP...`)
};

const zh_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在创建 ZIP...`)
};

const ja_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIPを作成中...`)
};

const ko_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP 생성 중...`)
};

const zh_hant1_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在建立 ZIP...`)
};

const de_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ZIP wird erstellt...`)
};

const fr_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Création du ZIP...`)
};

const uk_builderdownloadingzip2 = /** @type {(inputs: Builderdownloadingzip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Створюємо ZIP...`)
};

/**
* | output |
* | --- |
* | "Creating ZIP..." |
*
* @param {Builderdownloadingzip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadingzip2 = /** @type {((inputs?: Builderdownloadingzip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadingzip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdownloadingzip2(inputs)
	if (locale === "es") return es_builderdownloadingzip2(inputs)
	if (locale === "zh") return zh_builderdownloadingzip2(inputs)
	if (locale === "ja") return ja_builderdownloadingzip2(inputs)
	if (locale === "ko") return ko_builderdownloadingzip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdownloadingzip2(inputs)
	if (locale === "de") return de_builderdownloadingzip2(inputs)
	if (locale === "fr") return fr_builderdownloadingzip2(inputs)
	return uk_builderdownloadingzip2(inputs)
});
export { builderdownloadingzip2 as "builderDownloadingZip" }