/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpwebframework6Inputs */



/**
* | output |
* | --- |
* | "PHP HTTP framework." |
*
* @param {Docsclisummaryphpphpwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpwebframework6 = /** @type {((inputs?: Docsclisummaryphpphpwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Framework HTTP de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP HTTP 框架。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP の HTTP フレームワーク。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP HTTP 프레임워크.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP HTTP 框架。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-HTTP-Framework.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Framework HTTP PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("HTTP-фреймворк PHP.")
	return /** @type {LocalizedString} */ ("PHP HTTP framework.")
});
export { docsclisummaryphpphpwebframework6 as "docsCliSummaryPhpPhpWebFramework" }