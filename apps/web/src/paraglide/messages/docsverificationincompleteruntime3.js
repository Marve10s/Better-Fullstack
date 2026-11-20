/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationincompleteruntime3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión tiene evidencia de ejecución incompleta o que no coincide.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执包含不完整或不匹配的运行时证据。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートのランタイムエビデンスが不完全か、一致していません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙의 런타임 증거가 불완전하거나 일치하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執含有不完整或不相符的執行階段證據。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg enthält unvollständige oder nicht übereinstimmende Laufzeitnachweise.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version contient des preuves d'exécution incomplètes ou incohérentes.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє підтвердження релізу містить неповні або невідповідні докази виконання.")
	return /** @type {LocalizedString} */ ("The latest release receipt has incomplete or mismatched runtime evidence.")
});
export { docsverificationincompleteruntime3 as "docsVerificationIncompleteRuntime" }