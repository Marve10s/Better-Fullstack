/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunavailablebody3Inputs */

const en_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No receipt has been loaded, so this page makes no build-verification claim.`)
};

const es_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se ha cargado ningún comprobante, así que esta página no afirma ninguna verificación de compilación.`)
};

const zh_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`尚未加载任何回执，因此本页面不作出任何构建验证声明。`)
};

const ja_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レシートが読み込まれていないため、このページはビルド検証について何も主張しません。`)
};

const ko_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`불러온 증빙이 없으므로 이 페이지는 빌드 검증을 주장하지 않습니다.`)
};

const zh_hant1_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`尚未載入任何回執，因此此頁面不提出任何建置驗證聲明。`)
};

const de_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Es wurde kein Beleg geladen, daher trifft diese Seite keine Aussage zur Build-Verifizierung.`)
};

const fr_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucun reçu n'a été chargé : cette page n'affirme donc aucune vérification de build.`)
};

const uk_docsverificationunavailablebody3 = /** @type {(inputs: Docsverificationunavailablebody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підтвердження не завантажено, тому ця сторінка не стверджує, що збирання перевірено.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationunavailablebody3(inputs)
	if (locale === "zh") return zh_docsverificationunavailablebody3(inputs)
	if (locale === "ja") return ja_docsverificationunavailablebody3(inputs)
	if (locale === "ko") return ko_docsverificationunavailablebody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationunavailablebody3(inputs)
	if (locale === "de") return de_docsverificationunavailablebody3(inputs)
	if (locale === "fr") return fr_docsverificationunavailablebody3(inputs)
	if (locale === "uk") return uk_docsverificationunavailablebody3(inputs)
	return en_docsverificationunavailablebody3(inputs)
});
export { docsverificationunavailablebody3 as "docsVerificationUnavailableBody" }