/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnbasecolor6Inputs */



/**
* | output |
* | --- |
* | "Base neutral color." |
*
* @param {Docsclisummaryshadcnshadcnbasecolor6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnbasecolor6 = /** @type {((inputs?: Docsclisummaryshadcnshadcnbasecolor6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnbasecolor6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Color neutro base.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("基础中性色。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ベースのニュートラルカラー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본 중립 색상.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("基礎中性色。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neutrale Grundfarbe.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Couleur neutre de base.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Базовий нейтральний колір.")
	return /** @type {LocalizedString} */ ("Base neutral color.")
});
export { docsclisummaryshadcnshadcnbasecolor6 as "docsCliSummaryShadcnShadcnBaseColor" }