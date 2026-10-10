/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationincompleteruntime3Inputs */

const en_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt has incomplete or mismatched runtime evidence.`)
};

const es_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión tiene evidencia de ejecución incompleta o que no coincide.`)
};

const zh_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执包含不完整或不匹配的运行时证据。`)
};

const ja_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートのランタイムエビデンスが不完全か、一致していません。`)
};

const ko_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙의 런타임 증거가 불완전하거나 일치하지 않습니다.`)
};

const zh_hant1_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執含有不完整或不相符的執行階段證據。`)
};

const de_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg enthält unvollständige oder nicht übereinstimmende Laufzeitnachweise.`)
};

const fr_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version contient des preuves d'exécution incomplètes ou incohérentes.`)
};

const uk_docsverificationincompleteruntime3 = /** @type {(inputs: Docsverificationincompleteruntime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє підтвердження релізу містить неповні або невідповідні докази виконання.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt has incomplete or mismatched runtime evidence." |
*
* @param {Docsverificationincompleteruntime3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationincompleteruntime3 = /** @type {((inputs?: Docsverificationincompleteruntime3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationincompleteruntime3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationincompleteruntime3(inputs)
	if (locale === "zh") return zh_docsverificationincompleteruntime3(inputs)
	if (locale === "ja") return ja_docsverificationincompleteruntime3(inputs)
	if (locale === "ko") return ko_docsverificationincompleteruntime3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationincompleteruntime3(inputs)
	if (locale === "de") return de_docsverificationincompleteruntime3(inputs)
	if (locale === "fr") return fr_docsverificationincompleteruntime3(inputs)
	if (locale === "uk") return uk_docsverificationincompleteruntime3(inputs)
	return en_docsverificationincompleteruntime3(inputs)
});
export { docsverificationincompleteruntime3 as "docsVerificationIncompleteRuntime" }