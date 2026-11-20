/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationunavailabletitle3Inputs */



/**
* | output |
* | --- |
* | "Release evidence unavailable" |
*
* @param {Docsverificationunavailabletitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationunavailabletitle3 = /** @type {((inputs?: Docsverificationunavailabletitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationunavailabletitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Evidencia de la versión no disponible")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无法获取发布证据")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リリースのエビデンスを取得できません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("릴리스 증거를 사용할 수 없음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法取得發行證據")
	if (locale === "de") return /** @type {LocalizedString} */ ("Release-Nachweise nicht verfügbar")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Preuves de version indisponibles")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Докази релізу недоступні")
	return /** @type {LocalizedString} */ ("Release evidence unavailable")
});
export { docsverificationunavailabletitle3 as "docsVerificationUnavailableTitle" }