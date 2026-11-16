/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmismatchedpackage3Inputs */



/**
* | output |
* | --- |
* | "The latest release receipt has mismatched package identity." |
*
* @param {Docsverificationmismatchedpackage3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationmismatchedpackage3 = /** @type {((inputs?: Docsverificationmismatchedpackage3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationmismatchedpackage3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión tiene una identidad de paquete que no coincide.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执包含不匹配的包标识。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートのパッケージ識別情報が一致していません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙의 패키지 식별 정보가 일치하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執含有不相符的套件識別資訊。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg enthält eine nicht übereinstimmende Paketidentität.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version contient une identité de paquet incohérente.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє підтвердження релізу містить невідповідну ідентичність пакета.")
	return /** @type {LocalizedString} */ ("The latest release receipt has mismatched package identity.")
});
export { docsverificationmismatchedpackage3 as "docsVerificationMismatchedPackage" }