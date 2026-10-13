/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetauth5Inputs */

const en_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET auth.`)
};

const es_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación en .NET.`)
};

const zh_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 认证。`)
};

const ja_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET の認証。`)
};

const ko_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 인증.`)
};

const zh_hant1_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 驗證。`)
};

const de_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung für .NET.`)
};

const fr_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification .NET.`)
};

const uk_docsclisummarydotnetdotnetauth5 = /** @type {(inputs: Docsclisummarydotnetdotnetauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація в .NET.`)
};

/**
* | output |
* | --- |
* | ".NET auth." |
*
* @param {Docsclisummarydotnetdotnetauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetauth5 = /** @type {((inputs?: Docsclisummarydotnetdotnetauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetauth5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetauth5(inputs)
	return en_docsclisummarydotnetdotnetauth5(inputs)
});
export { docsclisummarydotnetdotnetauth5 as "docsCliSummaryDotnetDotnetAuth" }