/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphplogging5Inputs */

const en_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP logging (framework-specific).`)
};

const es_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de PHP (según el framework).`)
};

const zh_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 日志（按框架区分）。`)
};

const ja_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP のロギング（フレームワーク別）。`)
};

const ko_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 로깅(프레임워크별).`)
};

const zh_hant1_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 日誌（依框架區分）。`)
};

const de_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Logging (frameworkspezifisch).`)
};

const fr_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation PHP (propre au framework).`)
};

const uk_docsclisummaryphpphplogging5 = /** @type {(inputs: Docsclisummaryphpphplogging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Логування PHP (залежить від фреймворку).`)
};

/**
* | output |
* | --- |
* | "PHP logging (framework-specific)." |
*
* @param {Docsclisummaryphpphplogging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphplogging5 = /** @type {((inputs?: Docsclisummaryphpphplogging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphplogging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphplogging5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphplogging5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphplogging5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphplogging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphplogging5(inputs)
	if (locale === "de") return de_docsclisummaryphpphplogging5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphplogging5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphplogging5(inputs)
	return en_docsclisummaryphpphplogging5(inputs)
});
export { docsclisummaryphpphplogging5 as "docsCliSummaryPhpPhpLogging" }