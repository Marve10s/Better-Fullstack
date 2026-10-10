/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogotemplating5Inputs */

const en_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go templating.`)
};

const es_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Motor de plantillas Go.`)
};

const zh_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 模板引擎。`)
};

const ja_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のテンプレートエンジン。`)
};

const ko_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 템플릿 엔진.`)
};

const zh_hant1_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 範本引擎。`)
};

const de_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Template-Verarbeitung für Go.`)
};

const fr_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestion des templates Go.`)
};

const uk_docsclisummarygogotemplating5 = /** @type {(inputs: Docsclisummarygogotemplating5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Обробка шаблонів у Go.`)
};

/**
* | output |
* | --- |
* | "Go templating." |
*
* @param {Docsclisummarygogotemplating5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogotemplating5 = /** @type {((inputs?: Docsclisummarygogotemplating5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogotemplating5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogotemplating5(inputs)
	if (locale === "zh") return zh_docsclisummarygogotemplating5(inputs)
	if (locale === "ja") return ja_docsclisummarygogotemplating5(inputs)
	if (locale === "ko") return ko_docsclisummarygogotemplating5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogotemplating5(inputs)
	if (locale === "de") return de_docsclisummarygogotemplating5(inputs)
	if (locale === "fr") return fr_docsclisummarygogotemplating5(inputs)
	if (locale === "uk") return uk_docsclisummarygogotemplating5(inputs)
	return en_docsclisummarygogotemplating5(inputs)
});
export { docsclisummarygogotemplating5 as "docsCliSummaryGoGoTemplating" }