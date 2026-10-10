/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesvectordb6Inputs */

const en_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vector database.`)
};

const es_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de datos vectorial.`)
};

const zh_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`向量数据库。`)
};

const ja_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベクトルデータベース。`)
};

const ko_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벡터 데이터베이스.`)
};

const zh_hant1_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`向量資料庫。`)
};

const de_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vektordatenbank.`)
};

const fr_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de données vectorielle.`)
};

const uk_docsclisummarytypescriptservicesvectordb6 = /** @type {(inputs: Docsclisummarytypescriptservicesvectordb6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Векторна база даних.`)
};

/**
* | output |
* | --- |
* | "Vector database." |
*
* @param {Docsclisummarytypescriptservicesvectordb6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesvectordb6 = /** @type {((inputs?: Docsclisummarytypescriptservicesvectordb6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesvectordb6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesvectordb6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesvectordb6(inputs)
	return en_docsclisummarytypescriptservicesvectordb6(inputs)
});
export { docsclisummarytypescriptservicesvectordb6 as "docsCliSummaryTypescriptServicesVectorDb" }