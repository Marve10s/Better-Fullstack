/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotrun3Inputs */



/**
* | output |
* | --- |
* | "Not run" |
*
* @param {Docsverificationnotrun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotrun3 = /** @type {((inputs?: Docsverificationnotrun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotrun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sin ejecutar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("未运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("未実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실행 안 함")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("未執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nicht ausgeführt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Non exécuté")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не запускалося")
	return /** @type {LocalizedString} */ ("Not run")
});
export { docsverificationnotrun3 as "docsVerificationNotRun" }