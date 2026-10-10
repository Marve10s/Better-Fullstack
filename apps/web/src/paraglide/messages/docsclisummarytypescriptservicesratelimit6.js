/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesratelimit6Inputs */

const en_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rate limiting helper.`)
};

const es_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca auxiliar para limitar la tasa de solicitudes.`)
};

const zh_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`限流辅助工具。`)
};

const ja_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レート制限のヘルパー。`)
};

const ko_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`속도 제한 헬퍼.`)
};

const zh_hant1_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`速率限制輔助工具。`)
};

const de_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hilfsbibliothek zur Begrenzung der Anfragerate.`)
};

const fr_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de limitation du débit de requêtes.`)
};

const uk_docsclisummarytypescriptservicesratelimit6 = /** @type {(inputs: Docsclisummarytypescriptservicesratelimit6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Допоміжна бібліотека для обмеження частоти запитів.`)
};

/**
* | output |
* | --- |
* | "Rate limiting helper." |
*
* @param {Docsclisummarytypescriptservicesratelimit6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesratelimit6 = /** @type {((inputs?: Docsclisummarytypescriptservicesratelimit6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesratelimit6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesratelimit6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesratelimit6(inputs)
	return en_docsclisummarytypescriptservicesratelimit6(inputs)
});
export { docsclisummarytypescriptservicesratelimit6 as "docsCliSummaryTypescriptServicesRateLimit" }