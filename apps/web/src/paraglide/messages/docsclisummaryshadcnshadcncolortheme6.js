/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcncolortheme6Inputs */



/**
* | output |
* | --- |
* | "Color theme." |
*
* @param {Docsclisummaryshadcnshadcncolortheme6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcncolortheme6 = /** @type {((inputs?: Docsclisummaryshadcnshadcncolortheme6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcncolortheme6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Tema de colores.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("颜色主题。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("カラーテーマ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("색상 테마.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("色彩主題。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Farbthema.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Thème de couleurs.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Колірна тема.")
	return /** @type {LocalizedString} */ ("Color theme.")
});
export { docsclisummaryshadcnshadcncolortheme6 as "docsCliSummaryShadcnShadcnColorTheme" }