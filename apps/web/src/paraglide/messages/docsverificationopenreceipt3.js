/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationopenreceipt3Inputs */



/**
* | output |
* | --- |
* | "Open release receipt" |
*
* @param {Docsverificationopenreceipt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationopenreceipt3 = /** @type {((inputs?: Docsverificationopenreceipt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationopenreceipt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir comprobante de la versión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开发布回执")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リリースレシートを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("릴리스 증빙 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟發行回執")
	if (locale === "de") return /** @type {LocalizedString} */ ("Release-Beleg öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le reçu de version")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити підтвердження релізу")
	return /** @type {LocalizedString} */ ("Open release receipt")
});
export { docsverificationopenreceipt3 as "docsVerificationOpenReceipt" }