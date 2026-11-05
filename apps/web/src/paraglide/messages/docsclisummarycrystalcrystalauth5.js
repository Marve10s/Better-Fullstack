/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalauth5Inputs */

const en_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal authentication.`)
};

const es_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación experimental de Crystal.`)
};

const zh_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 身份验证。`)
};

const ja_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal 認証。`)
};

const ko_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 인증입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 身分驗證。`)
};

const de_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelle Crystal-Authentifizierung.`)
};

const fr_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification expérimentale Crystal.`)
};

const uk_docsclisummarycrystalcrystalauth5 = /** @type {(inputs: Docsclisummarycrystalcrystalauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальна автентифікація Crystal.`)
};

/**
* | output |
* | --- |
* | "Experimental Crystal authentication." |
*
* @param {Docsclisummarycrystalcrystalauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalauth5 = /** @type {((inputs?: Docsclisummarycrystalcrystalauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystalauth5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystalauth5(inputs)
	return en_docsclisummarycrystalcrystalauth5(inputs)
});
export { docsclisummarycrystalcrystalauth5 as "docsCliSummaryCrystalCrystalAuth" }