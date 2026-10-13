/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryjavajavaauth5Inputs */

const en_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java auth.`)
};

const es_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación en Java.`)
};

const zh_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 认证。`)
};

const ja_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java の認証。`)
};

const ko_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 인증.`)
};

const zh_hant1_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Java 驗證。`)
};

const de_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung für Java.`)
};

const fr_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification Java.`)
};

const uk_docsclisummaryjavajavaauth5 = /** @type {(inputs: Docsclisummaryjavajavaauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація в Java.`)
};

/**
* | output |
* | --- |
* | "Java auth." |
*
* @param {Docsclisummaryjavajavaauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryjavajavaauth5 = /** @type {((inputs?: Docsclisummaryjavajavaauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryjavajavaauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryjavajavaauth5(inputs)
	if (locale === "zh") return zh_docsclisummaryjavajavaauth5(inputs)
	if (locale === "ja") return ja_docsclisummaryjavajavaauth5(inputs)
	if (locale === "ko") return ko_docsclisummaryjavajavaauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryjavajavaauth5(inputs)
	if (locale === "de") return de_docsclisummaryjavajavaauth5(inputs)
	if (locale === "fr") return fr_docsclisummaryjavajavaauth5(inputs)
	if (locale === "uk") return uk_docsclisummaryjavajavaauth5(inputs)
	return en_docsclisummaryjavajavaauth5(inputs)
});
export { docsclisummaryjavajavaauth5 as "docsCliSummaryJavaJavaAuth" }