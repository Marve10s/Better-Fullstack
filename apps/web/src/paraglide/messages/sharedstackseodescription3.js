/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseodescription3Inputs */



/**
* | output |
* | --- |
* | "Open a shared Better Fullstack builder configuration." |
*
* @param {Sharedstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sharedstackseodescription3 = /** @type {((inputs?: Sharedstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abre una configuración compartida del constructor de Better Fullstack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开一个共享的 Better Fullstack 构建器配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有 Better Fullstack ビルダー構成を開きます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 Better Fullstack 빌더 구성을 엽니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟一個共享的 Better Fullstack 建構器配置。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen Sie eine freigegebene Builder-Konfiguration Better Fullstack.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrez une configuration de générateur Better Fullstack partagée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити спільну конфігурацію конструктора Better Fullstack.")
	return /** @type {LocalizedString} */ ("Open a shared Better Fullstack builder configuration.")
});
export { sharedstackseodescription3 as "sharedStackSeoDescription" }