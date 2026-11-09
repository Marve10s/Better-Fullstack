/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationreceiptvaliduntil4Inputs */



/**
* | output |
* | --- |
* | "Receipt valid until" |
*
* @param {Docsverificationreceiptvaliduntil4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationreceiptvaliduntil4 = /** @type {((inputs?: Docsverificationreceiptvaliduntil4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationreceiptvaliduntil4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comprobante válido hasta")
	if (locale === "zh") return /** @type {LocalizedString} */ ("回执有效期至")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レシート有効期限")
	if (locale === "ko") return /** @type {LocalizedString} */ ("증빙 유효 기한")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("回執有效期限")
	if (locale === "de") return /** @type {LocalizedString} */ ("Beleg gültig bis")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Reçu valable jusqu'au")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підтвердження дійсне до")
	return /** @type {LocalizedString} */ ("Receipt valid until")
});
export { docsverificationreceiptvaliduntil4 as "docsVerificationReceiptValidUntil" }