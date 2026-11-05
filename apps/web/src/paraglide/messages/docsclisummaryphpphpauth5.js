/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpauth5Inputs */

const en_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP authentication.`)
};

const es_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación de PHP.`)
};

const zh_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 认证。`)
};

const ja_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP の認証。`)
};

const ko_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 인증.`)
};

const zh_hant1_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 認證。`)
};

const de_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-Authentifizierung.`)
};

const fr_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification PHP.`)
};

const uk_docsclisummaryphpphpauth5 = /** @type {(inputs: Docsclisummaryphpphpauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація PHP.`)
};

/**
* | output |
* | --- |
* | "PHP authentication." |
*
* @param {Docsclisummaryphpphpauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpauth5 = /** @type {((inputs?: Docsclisummaryphpphpauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpauth5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpauth5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpauth5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpauth5(inputs)
	if (locale === "de") return de_docsclisummaryphpphpauth5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpauth5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpauth5(inputs)
	return en_docsclisummaryphpphpauth5(inputs)
});
export { docsclisummaryphpphpauth5 as "docsCliSummaryPhpPhpAuth" }