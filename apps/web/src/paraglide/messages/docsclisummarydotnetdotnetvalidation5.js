/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetvalidation5Inputs */

const en_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET validation.`)
};

const es_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validación en .NET.`)
};

const zh_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 校验。`)
};

const ja_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のバリデーション。`)
};

const ko_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 검증.`)
};

const zh_hant1_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 驗證。`)
};

const de_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validierung für .NET.`)
};

const fr_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation .NET.`)
};

const uk_docsclisummarydotnetdotnetvalidation5 = /** @type {(inputs: Docsclisummarydotnetdotnetvalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Валідація в .NET.`)
};

/**
* | output |
* | --- |
* | ".NET validation." |
*
* @param {Docsclisummarydotnetdotnetvalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetvalidation5 = /** @type {((inputs?: Docsclisummarydotnetdotnetvalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetvalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetvalidation5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetvalidation5(inputs)
	return en_docsclisummarydotnetdotnetvalidation5(inputs)
});
export { docsclisummarydotnetdotnetvalidation5 as "docsCliSummaryDotnetDotnetValidation" }