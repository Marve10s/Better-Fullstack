/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmissingfields3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Al comprobante más reciente de la versión le faltan campos obligatorios.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执缺少必填字段。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートに必須フィールドがありません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙에 필수 필드가 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執缺少必要欄位。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Im neuesten Release-Beleg fehlen erforderliche Felder.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Des champs obligatoires manquent dans le dernier reçu de version.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("В останньому підтвердженні релізу бракує обовʼязкових полів.")
	return /** @type {LocalizedString} */ ("The latest release receipt is missing required fields.")
});
export { docsverificationmissingfields3 as "docsVerificationMissingFields" }