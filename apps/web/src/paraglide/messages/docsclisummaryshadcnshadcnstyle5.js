/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnstyle5Inputs */



/**
* | output |
* | --- |
* | "shadcn style preset." |
*
* @param {Docsclisummaryshadcnshadcnstyle5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnstyle5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnstyle5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnstyle5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estilo predefinido de shadcn.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("shadcn 样式预设。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("shadcn のスタイルプリセット。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("shadcn 스타일 사전 설정.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("shadcn 樣式預設。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stilvoreinstellung für shadcn.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préréglage de style shadcn.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Готовий стиль shadcn.")
	return /** @type {LocalizedString} */ ("shadcn style preset.")
});
export { docsclisummaryshadcnshadcnstyle5 as "docsCliSummaryShadcnShadcnStyle" }