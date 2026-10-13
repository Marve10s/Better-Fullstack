/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesbotprotection6Inputs */

const en_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot and CAPTCHA verification provider.`)
};

const es_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de verificación de bots y CAPTCHA.`)
};

const zh_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`机器人防护与 CAPTCHA 验证服务商。`)
};

const ja_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ボット対策と CAPTCHA 検証のプロバイダー。`)
};

const ko_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`봇 차단 및 CAPTCHA 검증 제공자.`)
};

const zh_hant1_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`機器人防護與 CAPTCHA 驗證服務商。`)
};

const de_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anbieter für Bot- und CAPTCHA-Prüfungen.`)
};

const fr_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur de vérification des bots et des CAPTCHA.`)
};

const uk_docsclisummarytypescriptservicesbotprotection6 = /** @type {(inputs: Docsclisummarytypescriptservicesbotprotection6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер перевірки ботів і CAPTCHA.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesbotprotection6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesbotprotection6(inputs)
	return en_docsclisummarytypescriptservicesbotprotection6(inputs)
});
export { docsclisummarytypescriptservicesbotprotection6 as "docsCliSummaryTypescriptServicesBotProtection" }