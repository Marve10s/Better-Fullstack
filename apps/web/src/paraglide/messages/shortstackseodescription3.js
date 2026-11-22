/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Shortstackseodescription3Inputs */



/**
* | output |
* | --- |
* | "Open a short Better Fullstack builder configuration link." |
*
* @param {Shortstackseodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const shortstackseodescription3 = /** @type {((inputs?: Shortstackseodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Shortstackseodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abre un enlace corto de configuración del constructor de Better Fullstack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开一个短链接形式的 Better Fullstack 构建器配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("短い Better Fullstack ビルダー構成リンクを開きます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("짧은 Better Fullstack 빌더 구성 링크를 엽니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟一個短連結形式的 Better Fullstack 建構器配置。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen Sie einen kurzen Link zur Builder-Konfiguration Better Fullstack.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrez un court lien de configuration du générateur Better Fullstack.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити коротке посилання на конфігурацію Better Fullstack.")
	return /** @type {LocalizedString} */ ("Open a short Better Fullstack builder configuration link.")
});
export { shortstackseodescription3 as "shortStackSeoDescription" }