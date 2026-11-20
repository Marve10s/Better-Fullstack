/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoassertion3Inputs */



/**
* | output |
* | --- |
* | "No runtime assertion recorded" |
*
* @param {Docsverificationnoassertion3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoassertion3 = /** @type {((inputs?: Docsverificationnoassertion3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoassertion3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se registró ninguna aserción en tiempo de ejecución")
	if (locale === "zh") return /** @type {LocalizedString} */ ("未记录运行时断言")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイムアサーションの記録なし")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기록된 런타임 어서션 없음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("未記錄執行階段斷言")
	if (locale === "de") return /** @type {LocalizedString} */ ("Keine Laufzeitprüfung erfasst")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucune assertion d'exécution enregistrée")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевірок під час виконання не зафіксовано")
	return /** @type {LocalizedString} */ ("No runtime assertion recorded")
});
export { docsverificationnoassertion3 as "docsVerificationNoAssertion" }