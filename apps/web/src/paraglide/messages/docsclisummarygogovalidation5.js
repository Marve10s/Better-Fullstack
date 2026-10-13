/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogovalidation5Inputs */

const en_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go validation.`)
};

const es_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validación en Go.`)
};

const zh_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 校验。`)
};

const ja_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のバリデーション。`)
};

const ko_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 검증.`)
};

const zh_hant1_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 驗證。`)
};

const de_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validierung für Go.`)
};

const fr_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validation Go.`)
};

const uk_docsclisummarygogovalidation5 = /** @type {(inputs: Docsclisummarygogovalidation5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Валідація в Go.`)
};

/**
* | output |
* | --- |
* | "Go validation." |
*
* @param {Docsclisummarygogovalidation5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogovalidation5 = /** @type {((inputs?: Docsclisummarygogovalidation5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogovalidation5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogovalidation5(inputs)
	if (locale === "zh") return zh_docsclisummarygogovalidation5(inputs)
	if (locale === "ja") return ja_docsclisummarygogovalidation5(inputs)
	if (locale === "ko") return ko_docsclisummarygogovalidation5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogovalidation5(inputs)
	if (locale === "de") return de_docsclisummarygogovalidation5(inputs)
	if (locale === "fr") return fr_docsclisummarygogovalidation5(inputs)
	if (locale === "uk") return uk_docsclisummarygogovalidation5(inputs)
	return en_docsclisummarygogovalidation5(inputs)
});
export { docsclisummarygogovalidation5 as "docsCliSummaryGoGoValidation" }