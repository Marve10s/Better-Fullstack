/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackorm5Inputs */

const en_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / query layer.`)
};

const es_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / capa de consultas.`)
};

const zh_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / 查询层。`)
};

const ja_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / クエリレイヤー。`)
};

const ko_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / 쿼리 계층.`)
};

const zh_hant1_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / 查詢層。`)
};

const de_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / Abfrageschicht.`)
};

const fr_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / couche de requêtes.`)
};

const uk_docsclisummarytypescriptstackorm5 = /** @type {(inputs: Docsclisummarytypescriptstackorm5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM / шар запитів.`)
};

/**
* | output |
* | --- |
* | "ORM / query layer." |
*
* @param {Docsclisummarytypescriptstackorm5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackorm5 = /** @type {((inputs?: Docsclisummarytypescriptstackorm5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackorm5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackorm5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackorm5(inputs)
	return en_docsclisummarytypescriptstackorm5(inputs)
});
export { docsclisummarytypescriptstackorm5 as "docsCliSummaryTypescriptStackOrm" }