/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationcurrent2Inputs */



/**
* | output |
* | --- |
* | "Build verification is current" |
*
* @param {Docsverificationcurrent2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationcurrent2 = /** @type {((inputs?: Docsverificationcurrent2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationcurrent2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La verificación de compilación está al día")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建验证为最新状态")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルド検証は最新です")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드 검증이 최신입니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建置驗證為最新狀態")
	if (locale === "de") return /** @type {LocalizedString} */ ("Build-Verifizierung ist aktuell")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La vérification de build est à jour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевірка збирання актуальна")
	return /** @type {LocalizedString} */ ("Build verification is current")
});
export { docsverificationcurrent2 as "docsVerificationCurrent" }