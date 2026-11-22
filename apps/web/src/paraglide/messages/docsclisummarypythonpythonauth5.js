/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonauth5Inputs */



/**
* | output |
* | --- |
* | "Python auth." |
*
* @param {Docsclisummarypythonpythonauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonauth5 = /** @type {((inputs?: Docsclisummarypythonpythonauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Autenticación en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 认证。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python の認証。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 인증.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 驗證。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Authentifizierung für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Автентифікація в Python.")
	return /** @type {LocalizedString} */ ("Python auth.")
});
export { docsclisummarypythonpythonauth5 as "docsCliSummaryPythonPythonAuth" }