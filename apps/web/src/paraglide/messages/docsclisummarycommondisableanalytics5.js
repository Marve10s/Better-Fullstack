/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondisableanalytics5Inputs */

const en_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opt out of anonymous CLI analytics.`)
};

const es_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desactivar las estadísticas anónimas de la CLI.`)
};

const zh_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`退出匿名 CLI 使用统计。`)
};

const ja_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`匿名の CLI 利用統計の収集を無効にします。`)
};

const ko_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`익명 CLI 분석 수집을 거부합니다.`)
};

const zh_hant1_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停用匿名 CLI 使用統計。`)
};

const de_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anonyme CLI-Analysen deaktivieren.`)
};

const fr_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Désactiver les statistiques anonymes de la CLI.`)
};

const uk_docsclisummarycommondisableanalytics5 = /** @type {(inputs: Docsclisummarycommondisableanalytics5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вимкнути анонімну аналітику CLI.`)
};

/**
* | output |
* | --- |
* | "Opt out of anonymous CLI analytics." |
*
* @param {Docsclisummarycommondisableanalytics5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommondisableanalytics5 = /** @type {((inputs?: Docsclisummarycommondisableanalytics5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommondisableanalytics5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "zh") return zh_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "ja") return ja_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "ko") return ko_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "de") return de_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "fr") return fr_docsclisummarycommondisableanalytics5(inputs)
	if (locale === "uk") return uk_docsclisummarycommondisableanalytics5(inputs)
	return en_docsclisummarycommondisableanalytics5(inputs)
});
export { docsclisummarycommondisableanalytics5 as "docsCliSummaryCommonDisableAnalytics" }