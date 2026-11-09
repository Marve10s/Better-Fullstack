/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationbuildverified3Inputs */



/**
* | output |
* | --- |
* | "Build verified" |
*
* @param {Docsverificationbuildverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationbuildverified3 = /** @type {((inputs?: Docsverificationbuildverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationbuildverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Compilación verificada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建已验证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルド検証済み")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드 검증됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建置已驗證")
	if (locale === "de") return /** @type {LocalizedString} */ ("Build verifiziert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Build vérifié")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збирання перевірено")
	return /** @type {LocalizedString} */ ("Build verified")
});
export { docsverificationbuildverified3 as "docsVerificationBuildVerified" }