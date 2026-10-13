/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmissingfields3Inputs */

const en_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt is missing required fields.`)
};

const es_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Al comprobante más reciente de la versión le faltan campos obligatorios.`)
};

const zh_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执缺少必填字段。`)
};

const ja_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートに必須フィールドがありません。`)
};

const ko_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙에 필수 필드가 없습니다.`)
};

const zh_hant1_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執缺少必要欄位。`)
};

const de_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Im neuesten Release-Beleg fehlen erforderliche Felder.`)
};

const fr_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Des champs obligatoires manquent dans le dernier reçu de version.`)
};

const uk_docsverificationmissingfields3 = /** @type {(inputs: Docsverificationmissingfields3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`В останньому підтвердженні релізу бракує обовʼязкових полів.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt is missing required fields." |
*
* @param {Docsverificationmissingfields3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationmissingfields3 = /** @type {((inputs?: Docsverificationmissingfields3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationmissingfields3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationmissingfields3(inputs)
	if (locale === "zh") return zh_docsverificationmissingfields3(inputs)
	if (locale === "ja") return ja_docsverificationmissingfields3(inputs)
	if (locale === "ko") return ko_docsverificationmissingfields3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationmissingfields3(inputs)
	if (locale === "de") return de_docsverificationmissingfields3(inputs)
	if (locale === "fr") return fr_docsverificationmissingfields3(inputs)
	if (locale === "uk") return uk_docsverificationmissingfields3(inputs)
	return en_docsverificationmissingfields3(inputs)
});
export { docsverificationmissingfields3 as "docsVerificationMissingFields" }