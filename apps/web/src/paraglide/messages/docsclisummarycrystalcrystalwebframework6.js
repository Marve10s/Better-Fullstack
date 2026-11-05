/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalwebframework6Inputs */

const en_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal HTTP framework.`)
};

const es_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP experimental de Crystal.`)
};

const zh_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal HTTP 框架。`)
};

const ja_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal HTTP フレームワーク。`)
};

const ko_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적 Crystal HTTP 프레임워크.`)
};

const zh_hant1_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal HTTP 框架。`)
};

const de_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimentelles Crystal-HTTP-Framework.`)
};

const fr_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework HTTP expérimental Crystal.`)
};

const uk_docsclisummarycrystalcrystalwebframework6 = /** @type {(inputs: Docsclisummarycrystalcrystalwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальний HTTP-фреймворк Crystal.`)
};

/**
* | output |
* | --- |
* | "Experimental Crystal HTTP framework." |
*
* @param {Docsclisummarycrystalcrystalwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalwebframework6 = /** @type {((inputs?: Docsclisummarycrystalcrystalwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystalwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystalwebframework6(inputs)
	return en_docsclisummarycrystalcrystalwebframework6(inputs)
});
export { docsclisummarycrystalcrystalwebframework6 as "docsCliSummaryCrystalCrystalWebFramework" }