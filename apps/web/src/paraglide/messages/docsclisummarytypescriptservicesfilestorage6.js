/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfilestorage6Inputs */

const en_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Object storage provider.`)
};

const es_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de almacenamiento de objetos.`)
};

const zh_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`对象存储服务商。`)
};

const ja_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オブジェクトストレージプロバイダー。`)
};

const ko_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`객체 스토리지 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`物件儲存服務商。`)
};

const de_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anbieter für Objektspeicher.`)
};

const fr_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur de stockage d’objets.`)
};

const uk_docsclisummarytypescriptservicesfilestorage6 = /** @type {(inputs: Docsclisummarytypescriptservicesfilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер об’єктного сховища.`)
};

/**
* | output |
* | --- |
* | "Object storage provider." |
*
* @param {Docsclisummarytypescriptservicesfilestorage6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesfilestorage6 = /** @type {((inputs?: Docsclisummarytypescriptservicesfilestorage6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesfilestorage6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesfilestorage6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesfilestorage6(inputs)
	return en_docsclisummarytypescriptservicesfilestorage6(inputs)
});
export { docsclisummarytypescriptservicesfilestorage6 as "docsCliSummaryTypescriptServicesFileStorage" }