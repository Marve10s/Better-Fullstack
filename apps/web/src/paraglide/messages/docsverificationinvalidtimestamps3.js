/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationinvalidtimestamps3Inputs */



/**
* | output |
* | --- |
* | "The latest release receipt has invalid timestamps." |
*
* @param {Docsverificationinvalidtimestamps3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationinvalidtimestamps3 = /** @type {((inputs?: Docsverificationinvalidtimestamps3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationinvalidtimestamps3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El comprobante más reciente de la versión tiene marcas de tiempo no válidas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新的发布回执包含无效的时间戳。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のリリースレシートのタイムスタンプが無効です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스 증빙의 타임스탬프가 유효하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新的發行回執含有無效的時間戳記。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der neueste Release-Beleg enthält ungültige Zeitstempel.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le dernier reçu de version contient des horodatages invalides.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє підтвердження релізу містить недійсні часові позначки.")
	return /** @type {LocalizedString} */ ("The latest release receipt has invalid timestamps.")
});
export { docsverificationinvalidtimestamps3 as "docsVerificationInvalidTimestamps" }