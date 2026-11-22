/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesbotprotection6Inputs */



/**
* | output |
* | --- |
* | "Bot and CAPTCHA verification provider." |
*
* @param {Docsclisummarytypescriptservicesbotprotection6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesbotprotection6 = /** @type {((inputs?: Docsclisummarytypescriptservicesbotprotection6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesbotprotection6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proveedor de verificación de bots y CAPTCHA.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("机器人防护与 CAPTCHA 验证服务商。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ボット対策と CAPTCHA 検証のプロバイダー。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("봇 차단 및 CAPTCHA 검증 제공자.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("機器人防護與 CAPTCHA 驗證服務商。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anbieter für Bot- und CAPTCHA-Prüfungen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fournisseur de vérification des bots et des CAPTCHA.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Провайдер перевірки ботів і CAPTCHA.")
	return /** @type {LocalizedString} */ ("Bot and CAPTCHA verification provider.")
});
export { docsclisummarytypescriptservicesbotprotection6 as "docsCliSummaryTypescriptServicesBotProtection" }