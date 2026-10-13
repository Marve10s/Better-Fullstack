/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetorm5Inputs */

const en_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET data access.`)
};

const es_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Acceso a datos en .NET.`)
};

const zh_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 数据访问。`)
};

const ja_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のデータアクセス。`)
};

const ko_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 데이터 액세스.`)
};

const zh_hant1_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 資料存取。`)
};

const de_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenzugriff für .NET.`)
};

const fr_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accès aux données .NET.`)
};

const uk_docsclisummarydotnetdotnetorm5 = /** @type {(inputs: Docsclisummarydotnetdotnetorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Доступ до даних у .NET.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetorm5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetorm5(inputs)
	return en_docsclisummarydotnetdotnetorm5(inputs)
});
export { docsclisummarydotnetdotnetorm5 as "docsCliSummaryDotnetDotnetOrm" }