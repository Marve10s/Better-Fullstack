/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmismatchedpackage3Inputs */

const en_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt has mismatched package identity.`)
};

const es_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión tiene una identidad de paquete que no coincide.`)
};

const zh_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执包含不匹配的包标识。`)
};

const ja_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートのパッケージ識別情報が一致していません。`)
};

const ko_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙의 패키지 식별 정보가 일치하지 않습니다.`)
};

const zh_hant1_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執含有不相符的套件識別資訊。`)
};

const de_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg enthält eine nicht übereinstimmende Paketidentität.`)
};

const fr_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version contient une identité de paquet incohérente.`)
};

const uk_docsverificationmismatchedpackage3 = /** @type {(inputs: Docsverificationmismatchedpackage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє підтвердження релізу містить невідповідну ідентичність пакета.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationmismatchedpackage3(inputs)
	if (locale === "zh") return zh_docsverificationmismatchedpackage3(inputs)
	if (locale === "ja") return ja_docsverificationmismatchedpackage3(inputs)
	if (locale === "ko") return ko_docsverificationmismatchedpackage3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationmismatchedpackage3(inputs)
	if (locale === "de") return de_docsverificationmismatchedpackage3(inputs)
	if (locale === "fr") return fr_docsverificationmismatchedpackage3(inputs)
	if (locale === "uk") return uk_docsverificationmismatchedpackage3(inputs)
	return en_docsverificationmismatchedpackage3(inputs)
});
export { docsverificationmismatchedpackage3 as "docsVerificationMismatchedPackage" }