/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondisableanalytics5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Desactivar las estadísticas anónimas de la CLI.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("退出匿名 CLI 使用统计。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("匿名の CLI 利用統計の収集を無効にします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("익명 CLI 분석 수집을 거부합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("停用匿名 CLI 使用統計。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anonyme CLI-Analysen deaktivieren.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Désactiver les statistiques anonymes de la CLI.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вимкнути анонімну аналітику CLI.")
	return /** @type {LocalizedString} */ ("Opt out of anonymous CLI analytics.")
});
export { docsclisummarycommondisableanalytics5 as "docsCliSummaryCommonDisableAnalytics" }