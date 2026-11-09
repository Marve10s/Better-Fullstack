/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotcurrent3Inputs */



/**
* | output |
* | --- |
* | "Build verification is not current" |
*
* @param {Docsverificationnotcurrent3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotcurrent3 = /** @type {((inputs?: Docsverificationnotcurrent3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotcurrent3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La verificación de compilación no está al día")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建验证不是最新状态")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビルド検証は最新ではありません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("빌드 검증이 최신이 아닙니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建置驗證不是最新狀態")
	if (locale === "de") return /** @type {LocalizedString} */ ("Build-Verifizierung ist nicht aktuell")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La vérification de build n'est pas à jour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевірка збирання неактуальна")
	return /** @type {LocalizedString} */ ("Build verification is not current")
});
export { docsverificationnotcurrent3 as "docsVerificationNotCurrent" }