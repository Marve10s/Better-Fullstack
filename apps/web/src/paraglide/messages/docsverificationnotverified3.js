/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotverified3Inputs */



/**
* | output |
* | --- |
* | "Not verified" |
*
* @param {Docsverificationnotverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotverified3 = /** @type {((inputs?: Docsverificationnotverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sin verificar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("未验证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("未検証")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검증되지 않음")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("未驗證")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nicht verifiziert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Non vérifié")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не перевірено")
	return /** @type {LocalizedString} */ ("Not verified")
});
export { docsverificationnotverified3 as "docsVerificationNotVerified" }