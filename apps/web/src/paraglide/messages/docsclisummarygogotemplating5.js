/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogotemplating5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Motor de plantillas Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 模板引擎。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go のテンプレートエンジン。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 템플릿 엔진.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 範本引擎。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Template-Verarbeitung für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Gestion des templates Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Обробка шаблонів у Go.")
	return /** @type {LocalizedString} */ ("Go templating.")
});
export { docsclisummarygogotemplating5 as "docsCliSummaryGoGoTemplating" }