/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationreceiptcreated3Inputs */



/**
* | output |
* | --- |
* | "Receipt created" |
*
* @param {Docsverificationreceiptcreated3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationreceiptcreated3 = /** @type {((inputs?: Docsverificationreceiptcreated3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationreceiptcreated3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comprobante creado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("回执创建时间")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レシート作成日時")
	if (locale === "ko") return /** @type {LocalizedString} */ ("증빙 생성 시각")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("回執建立時間")
	if (locale === "de") return /** @type {LocalizedString} */ ("Beleg erstellt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Reçu créé le")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підтвердження створено")
	return /** @type {LocalizedString} */ ("Receipt created")
});
export { docsverificationreceiptcreated3 as "docsVerificationReceiptCreated" }