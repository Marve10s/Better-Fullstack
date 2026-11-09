/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunavailablebody3Inputs */



/**
* | output |
* | --- |
* | "No receipt has been loaded, so this page makes no build-verification claim." |
*
* @param {Docsverificationunavailablebody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationunavailablebody3 = /** @type {((inputs?: Docsverificationunavailablebody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationunavailablebody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se ha cargado ningún comprobante, así que esta página no afirma ninguna verificación de compilación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("尚未加载任何回执，因此本页面不作出任何构建验证声明。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レシートが読み込まれていないため、このページはビルド検証について何も主張しません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("불러온 증빙이 없으므로 이 페이지는 빌드 검증을 주장하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("尚未載入任何回執，因此此頁面不提出任何建置驗證聲明。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Es wurde kein Beleg geladen, daher trifft diese Seite keine Aussage zur Build-Verifizierung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucun reçu n'a été chargé : cette page n'affirme donc aucune vérification de build.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підтвердження не завантажено, тому ця сторінка не стверджує, що збирання перевірено.")
	return /** @type {LocalizedString} */ ("No receipt has been loaded, so this page makes no build-verification claim.")
});
export { docsverificationunavailablebody3 as "docsVerificationUnavailableBody" }