/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncaching5Inputs */



/**
* | output |
* | --- |
* | "Python caching." |
*
* @param {Docsclisummarypythonpythoncaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythoncaching5 = /** @type {((inputs?: Docsclisummarypythonpythoncaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythoncaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Caché en Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 缓存。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のキャッシュ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 캐싱.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 快取。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Caching für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise en cache Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кешування в Python.")
	return /** @type {LocalizedString} */ ("Python caching.")
});
export { docsclisummarypythonpythoncaching5 as "docsCliSummaryPythonPythonCaching" }