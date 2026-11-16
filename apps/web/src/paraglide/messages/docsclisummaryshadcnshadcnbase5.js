/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnbase5Inputs */



/**
* | output |
* | --- |
* | "shadcn primitive base." |
*
* @param {Docsclisummaryshadcnshadcnbase5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnbase5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnbase5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnbase5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Base de primitivas de shadcn.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("shadcn 基础原语库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("shadcn のプリミティブベース。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("shadcn 프리미티브 기반.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("shadcn 基礎元件函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Basis für shadcn-Primitives.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Base de primitives shadcn.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("База примітивів shadcn.")
	return /** @type {LocalizedString} */ ("shadcn primitive base.")
});
export { docsclisummaryshadcnshadcnbase5 as "docsCliSummaryShadcnShadcnBase" }