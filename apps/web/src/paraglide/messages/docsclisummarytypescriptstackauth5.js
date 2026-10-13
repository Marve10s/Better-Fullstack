/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackauth5Inputs */

const en_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentication provider.`)
};

const es_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedor de autenticación.`)
};

const zh_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`认证提供方。`)
};

const ja_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認証プロバイダー。`)
};

const ko_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`인증 제공자.`)
};

const zh_hant1_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驗證服務商。`)
};

const de_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierungsanbieter.`)
};

const fr_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseur d’authentification.`)
};

const uk_docsclisummarytypescriptstackauth5 = /** @type {(inputs: Docsclisummarytypescriptstackauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Провайдер автентифікації.`)
};

/**
* | output |
* | --- |
* | "Authentication provider." |
*
* @param {Docsclisummarytypescriptstackauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackauth5 = /** @type {((inputs?: Docsclisummarytypescriptstackauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackauth5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackauth5(inputs)
	return en_docsclisummarytypescriptstackauth5(inputs)
});
export { docsclisummarytypescriptstackauth5 as "docsCliSummaryTypescriptStackAuth" }