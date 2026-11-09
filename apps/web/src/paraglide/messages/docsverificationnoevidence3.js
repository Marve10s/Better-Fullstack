/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoevidence3Inputs */



/**
* | output |
* | --- |
* | "No current evidence" |
*
* @param {Docsverificationnoevidence3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoevidence3 = /** @type {((inputs?: Docsverificationnoevidence3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoevidence3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sin evidencia actual")
	if (locale === "zh") return /** @type {LocalizedString} */ ("没有当前证据")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のエビデンスなし")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 증거 없음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("沒有目前證據")
	if (locale === "de") return /** @type {LocalizedString} */ ("Keine aktuellen Nachweise")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucune preuve actuelle")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Немає актуальних доказів")
	return /** @type {LocalizedString} */ ("No current evidence")
});
export { docsverificationnoevidence3 as "docsVerificationNoEvidence" }