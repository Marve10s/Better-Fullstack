/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesfilestorage6Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de almacenamiento de objetos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("对象存储服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("オブジェクトストレージプロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("객체 스토리지 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("物件儲存服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anbieter für Objektspeicher.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur de stockage d’objets.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер об’єктного сховища.")
	return /** @type {LocalizedString} */ ("Object storage provider.")
});
export { docsclisummarytypescriptservicesfilestorage6 as "docsCliSummaryTypescriptServicesFileStorage" }