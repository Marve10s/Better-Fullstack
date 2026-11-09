/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotavailable3Inputs */



/**
* | output |
* | --- |
* | "Not available" |
*
* @param {Docsverificationnotavailable3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotavailable3 = /** @type {((inputs?: Docsverificationnotavailable3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotavailable3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No disponible")
	if (locale === "zh") return /** @type {LocalizedString} */ ("不可用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("利用できません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사용할 수 없음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法取得")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nicht verfügbar")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Non disponible")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Недоступно")
	return /** @type {LocalizedString} */ ("Not available")
});
export { docsverificationnotavailable3 as "docsVerificationNotAvailable" }