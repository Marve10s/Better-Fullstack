/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadingzip2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Creando ZIP...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在创建 ZIP...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ZIPを作成中...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ZIP 생성 중...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在建立 ZIP...")
	if (locale === "de") return /** @type {LocalizedString} */ ("ZIP wird erstellt...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Création du ZIP...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створюємо ZIP...")
	return /** @type {LocalizedString} */ ("Creating ZIP...")
});
export { builderdownloadingzip2 as "builderDownloadingZip" }