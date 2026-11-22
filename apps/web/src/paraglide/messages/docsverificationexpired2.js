/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationexpired2Inputs */



/**
* | output |
* | --- |
* | "The latest release receipt has expired." |
*
* @param {Docsverificationexpired2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationexpired2 = /** @type {((inputs?: Docsverificationexpired2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationexpired2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión ha caducado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执已过期。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートは有効期限が切れています。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙이 만료되었습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執已過期。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg ist abgelaufen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version a expiré.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Термін дії останнього підтвердження релізу минув.")
	return /** @type {LocalizedString} */ ("The latest release receipt has expired.")
});
export { docsverificationexpired2 as "docsVerificationExpired" }