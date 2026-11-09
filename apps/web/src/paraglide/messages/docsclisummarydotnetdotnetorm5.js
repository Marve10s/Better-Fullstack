/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetorm5Inputs */



/**
* | output |
* | --- |
* | ".NET data access." |
*
* @param {Docsclisummarydotnetdotnetorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetorm5 = /** @type {((inputs?: Docsclisummarydotnetdotnetorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Acceso a datos en .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 数据访问。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のデータアクセス。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 데이터 액세스.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 資料存取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Datenzugriff für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Accès aux données .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Доступ до даних у .NET.")
	return /** @type {LocalizedString} */ (".NET data access.")
});
export { docsclisummarydotnetdotnetorm5 as "docsCliSummaryDotnetDotnetOrm" }