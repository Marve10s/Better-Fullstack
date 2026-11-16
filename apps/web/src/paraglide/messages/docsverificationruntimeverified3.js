/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationruntimeverified3Inputs */



/**
* | output |
* | --- |
* | "Runtime verified" |
*
* @param {Docsverificationruntimeverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationruntimeverified3 = /** @type {((inputs?: Docsverificationruntimeverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationruntimeverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecución verificada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行时已验证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイム検証済み")
	if (locale === "ko") return /** @type {LocalizedString} */ ("런타임 검증됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行階段已驗證")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laufzeit verifiziert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécution vérifiée")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Виконання перевірено")
	return /** @type {LocalizedString} */ ("Runtime verified")
});
export { docsverificationruntimeverified3 as "docsVerificationRuntimeVerified" }