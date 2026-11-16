/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoreceipt3Inputs */



/**
* | output |
* | --- |
* | "No current release receipt is available." |
*
* @param {Docsverificationnoreceipt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoreceipt3 = /** @type {((inputs?: Docsverificationnoreceipt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoreceipt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No hay ningún comprobante de versión actual disponible.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("当前没有可用的发布回执。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のリリースレシートはありません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 릴리스 증빙이 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("目前沒有可用的發行回執。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Es ist kein aktueller Release-Beleg verfügbar.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucun reçu de version actuel n'est disponible.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Немає актуального підтвердження релізу.")
	return /** @type {LocalizedString} */ ("No current release receipt is available.")
});
export { docsverificationnoreceipt3 as "docsVerificationNoReceipt" }